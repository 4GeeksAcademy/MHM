from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class MentalHealthResources (db.Model):
  resource_id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text)
  type = db.Column(db.String(255))
  url = db.Column(db.String(255))

  def __repr__(self):
    return f'<MentalHealthResources {self.title}>'

  def serialize(self):
    return {
      "resource_id": self.resource_id,
      "title": self.title,
      "description": self.description,
      "type": self.type,
      "url": self.url,
    }

class MeditationSessions (db.Model):
  __tablename__ = 'meditation_sessions'
  session_id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  style = db.Column(db.String(255))
  theme = db.Column(db.String(255))
  youtube_url = db.Column(db.String(255))

  def __repr__(self):
    return f'<MeditationSessions {self.title}>'

  def serialize(self):
    return {
      "session_id": self.session_id,
      "title": self.title,
      "style": self.style,
      "theme": self.theme,
      "youtube_url": self.youtube_url
    }

class JournalEntries(db.Model):
    __tablename__ = 'journal_entries'
    entry_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(255), nullable=False)
    mood = db.Column(db.String(255))
    content = db.Column(db.Text)

    def __repr__(self):
        return f'<JournalEntries {self.date}>'

    def serialize(self):
        return {
            "entry_id": self.entry_id,
            "date": self.date,
            "mood": self.mood,
            "content": self.content
        }