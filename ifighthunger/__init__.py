#
# @author Cory Dolphin
# @wcdolphin
#

from flask import Flask, render_template, request, redirect, url_for, abort
#from flask.ext.login import (LoginManager,AnonymousUser) # want to handle login?
#from flask.ext.bcrypt import Bcrypt #want to hash passwords? (You should!)
#from flaskext.cache import Cache # want a cache?
from flask.ext.mongoengine import MongoEngine
import config #our super sweet configuration module!
from datetime import datetime
import facebook
app = Flask(__name__)

__cfg = config.getConfig()
app.config.from_object(__cfg) 
app.configType = __cfg

db = MongoEngine(app) #database and ORM
app.jinja_env.autoescape = True

#loginManager = LoginManager() #handle login and sessions
#crypt = Bcrypt(app) #bcrypt for password hashing
#cache = Cache(app)

#loginManager.setup_app(app)
#loginManager.login_view = "login"
#loginManager.login_message = u"Please log in to access this page."
#loginManager.refresh_view = "reauth"
#loginManager.session_protection = "strong"

from ifighthunger import views
def url_static(filename=None):
	if app.config['DEBUG']:
		return url_for('static',filename=filename)
	return "//s3.amazonaws.com/fighthunger/static/%s"%filename
app.jinja_env.globals.update(url_static=url_static)



print "Initialized with config:%s" %type(__cfg)

