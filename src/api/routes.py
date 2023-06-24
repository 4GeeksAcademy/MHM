import os  
from flask import Flask ,request, jsonify, Blueprint 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity 
from flask_jwt_extended import jwt_required 
from api.models import db, User, MentalHealthResources, JournalEntries
import datetime

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    rb=request.get_json()
    email = rb["email"]
    password = rb["password"]
    user=User.query.filter_by(email=email).first()

    if user:

        return jsonify(message='Email already registered'), 200

    new_user = User(email=rb["email"], password=rb["password"], is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message='User register successfully'), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(message=e), 200
    
@api.route('/login', methods=['POST'])
def login():
    get_login = request.get_json()
    email = get_login["email"]
    password = get_login["password"]

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({'message': 'Invalid credentials'}), 401

    # create token
    expiration = datetime.timedelta(days=3)
    access_token = create_access_token(identity= user.id, expires_delta= expiration)
    return jsonify({'message': 'Logged in successfully.', 'access_token':access_token}), 200

@api.route('/get_condition/<condition>', methods=['GET'])
def get_condition(condition):
    url = f'https://api.nhs.uk/mental-health/conditions/{condition}'
    headers = {'subscription-key': os.environ.get('NHS_API_KEY')}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Internal server error'})



@api.route('/all_resources', methods=['GET'])
def all_resource_articles():
    all_resources=MentalHealthResources.query.all()
    articles_list=list(map(lambda MentalHealthResources: MentalHealthResources.serialize(), all_resources))
    return jsonify(articles_list), 200

@api.route('/meditation', methods=['GET', 'POST'])
def meditation():
    get_session=request.get_json()
    title=get_session["title"]
    style=get_session["style"]
    theme=get_session["theme"]
    youtube_url=get_session["youtube_url"]
    meditation=MeditationSessions.query.filter_by(title=title).first()

    new_session=MeditationSessions(title=get_session["title"])
                                       
    db.session.add(new_session)
    db.session.commit()
    return jsonify(message='Your session is ready.'), 200

@api.route('/get_journal', methods=['GET'])
def get_entries():
    entries = JournalEntries.query.all()
    entries_data = [
        {
            'date': entry.date,
            'mood': entry.mood,
            'content': entry.content
        }
        for entry in entries
    ]
    return jsonify(entries_data), 200

@api.route('/post_journal', methods=['POST'])
def post_entries():

    get_entry = request.get_json()
    print (get_entry)
    date = get_entry.get("date", None)
    mood = get_entry.get("mood", None)
    content = get_entry.get("content", None)

    if not date:
        return jsonify(message='Date is required'), 400

    new_entry = JournalEntries(date=date, mood=mood, content=content)

    try:
        db.session.add(new_entry)
        db.session.commit()
        return jsonify(message='Your new entry is available'), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500

@api.route('/all_entries', methods=['GET'])
def all_journey_entries():
    all_entries=JournalEntries.query.all()
    entries_list=list(map(lambda JournalEntries: JournalEntries.serialize(), all_entries))
    return jsonify(entries_list), 200
