from flask import Flask, render_template, request, jsonify, redirect, url_for
from ifighthunger.models import Stamp, Pledge
#from ifighthunger.forms import (LoginForm)
from ifighthunger import app #, loginManager, crypt, db, cache
import utils
import facebook
import urllib
import datetime

UTCOFFSET = datetime.timedelta(hours=5)
def getFacebookUser():
    try: 
        return facebook.get_user_from_cookie(request.cookies, app.config['FACEBOOK_APP_ID'], app.config['FACEBOOK_APP_SECRET'])
    except Exception as e:
        app.logger.debug(e)
        return False


@app.route('/', methods=['GET'] )
def index():
    pledges = Pledge.objects[:10]
    for p in pledges:
        app.logger.info(p.smallLink())
    return render_template('index.html', pledges=Pledge.objects[:10], curDay =(datetime.datetime.now() - UTCOFFSET).day)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/dc/2012/grillfish')
def grillfish():
    return render_template('grillfish.html')

@app.route('/dc/2012/atown')
def atown():
    return render_template('atown.html')

@app.route('/dc/2012/cashion')
def cashion():
    return render_template('cashion.html')

def coerece(x,xMax,xMin):
    if x < xMin:
        return xMin
    elif x > xMax:
        return xMax
    else:
        return x

@app.route('/pledge', methods=['GET','POST'])
def pledge():
    fbUser = getFacebookUser()
    app.logger.info(fbUser)
    pDay = (datetime.datetime.now() - UTCOFFSET).day
    if request.method == "POST":
        app.logger.info(request.form)
        if not fbUser:
            app.logger.error("USER IS NOT FACEBOOK AUTHED")
        p = Pledge.objects(fb_user_id=fbUser['uid'], day=int(pDay)).first()
        _small_key = urllib.quote(request.form.get('small_key',''),'')
        _large_key= urllib.quote(request.form.get('large_key',''),'')
        _day = pDay
        _message = request.form.get('message', '')
        _framey_mp4_url = request.form.get('FrameyRecorder[framey_mp4_url]', '')
        _framey_flv_url = request.form.get('FrameyRecorder[framey_flv_url]', '')
        _framey_large_thumb_url = request.form.get('FrameyRecorder[framey_large_thumb_url]', '')
        _email = request.form.get('email','')
        app.logger.info(_framey_mp4_url)
        app.logger.info(_framey_large_thumb_url)

        if p == None:
            p = Pledge(fb_user_id=fbUser['uid'],
                small_key=_small_key,
                large_key=_large_key,
                day = _day, #placeholder, should be dynamically generated from current date
                message = _message,
                framey_mp4_url = _framey_mp4_url,
                framey_flv_url = _framey_flv_url,
                framey_large_thumb_url = _framey_mp4_url,
                email=_email)
        
        else:
            p.small_key = _small_key
            p.large_key= _large_key
            p.day = _day
            p.message = _message
            p.framey_mp4_url = _framey_mp4_url
            p.framey_flv_url = _framey_flv_url
            p.framey_large_thumb_url = _framey_large_thumb_url
            p.email = _email
        p.save()
        try:
            graph = facebook.GraphAPI(fbUser["access_token"])
            graph.put_wall_post(_message,{
                "link": "http://www.ifighthunger.org/pledge/%s/%s"%(pDay,fbUser['uid']),
                 "caption": "I Pledged to fight hunger, will you?",
                 "picture": p.largeLink()})
        except Exception as e:
            print e
        return redirect(url_for('pledge_view_specific',fb_user_id = fbUser['uid'], day=p.day))

    return render_template('pledge.html', fbUser=fbUser)

@app.route('/pledge/<string:fb_user_id>')
def pledge_view(fb_user_id):
    p = Pledge.objects(fb_user_id=fb_user_id).first()
    fbUser = getFacebookUser()
    same = fbUser != None and fbUser['uid'] == p.fb_user_id
    if p != None:
        return render_template('pledge_view.html',p=p,owner=same)
    else:
        return "ERROR"

@app.route('/pledge/<int:day>/<string:fb_user_id>')
def pledge_view_specific(fb_user_id,day):
    p = Pledge.objects(fb_user_id=fb_user_id,day=day).first()
    print p
    fbUser = getFacebookUser()
    same = fbUser != None and fbUser['uid'] == p.fb_user_id
    if p != None:
        return render_template('pledge_view.html',p=p,owner=same)
    else:
        return "ERROR"


@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for("index"))


@app.errorhandler(403)
def forbidden(error):
    return 'Cory should really handle this forbidden',403


@app.errorhandler(500)
def internal_server_error(error):
    return 'Cory should really handle this internal server error', 500

