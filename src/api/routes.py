import os  
from flask import Flask ,request, jsonify, Blueprint 
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
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

    # return jsonify ({'message': 'You have logged in successfully.'})

@api.route('/resource', methods=['GET', 'POST'])
def resource():
    get_resource=request.get_json()
    title=get_resource["title"]
    description=get_resource["description"]
    type=get_resource["type"]
    url=get_resource["url"]
    resource=MentalHealthResources.query.filter_by(title=title).first()

    new_resource=MentalHealthResources(title=get_resource["title"])
                                       
    db.session.add(new_resource)
    db.session.commit()
    return jsonify(message='Your resource is ready.'), 200

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

@api.route('/journal', methods=['POST'])
def journal_entries():
    get_entry = request.get_json()
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