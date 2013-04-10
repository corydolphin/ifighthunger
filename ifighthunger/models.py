#
# @author Cory Dolphin
# @wcdolphin
#

from ifighthunger import db, app #, cache, crypt # use a cache and a crypto library for users!
from flask import url_for
import datetime
import utils
import re
import random
import urllib

path_formate_str = "https://s3.amazonaws.com/fighthunger/%s"

class Stamp(db.Document):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    title = db.StringField(default = lambda : '%s' % random.random(), required=False)

    def __unicode__(self):
        return self.title

class Pledge(db.Document):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    fb_user_id = db.StringField(required=True)
    large_key = db.StringField(required=False)
    small_key = db.StringField(required=False)
    email = db.StringField(required=False)
    message = db.StringField(default = "", required=False)
    day = db.IntField(default=0, required=True)
    framey_mp4_url = db.StringField(default = "", required=False)
    framey_flv_url = db.StringField(default = "", required=False)
    framey_large_thumb_url = db.StringField(default = "", required=False)

    def smallLink(self):
        if len(self.small_key) >= 1:
        	return path_formate_str % self.small_key
        else:
            return self.framey_large_thumb_url

    def getDay(self):
        try:
            if not self.day:
                return 0
        except Exception as e:
            return 0

    def link(self):
        return url_for('pledge_view_specific', fb_user_id=self.fb_user_id, day=self.day)

    def largeLink(self):
        if len(self.large_key) >= 1:
            return path_formate_str % self.large_key
        else:
            return self.framey_large_thumb_url

    def videoLink(self):
        return self.framey_mp4_url

    def hasImage(self):
        return len(self.small_key) > 0 and len(self.large_key) > 0

    def hasVideo(self):
        return len(self.framey_mp4_url) > 0 and len(self.framey_large_thumb_url) > 0

    def __unicode__(self):
        return 'user:{user_id:"%s", large_key:"%s", small_key:"%s"}' % (self.fb_user_id, self.large_key, self.small_key)

    def __str__(self):
    	return self.__unicode__()

    def __repr__(self):
    	return self.__unicode__()