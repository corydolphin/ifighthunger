#
# @author Cory Dolphin
# @wcdolphin
#
import os

class Config(object):
    """
    Basic default global configuration variables not specific to any environment
    """
    SQLALCHEMY_ECHO = False
    SOMECOOLCONSTANT = 3
    SECRET_KEY = 'verysecret'
    DEBUG = True
    MONGODB_DB = ""
    MONGODB_USERNAME=""
    MONGODB_PASSWORD = ""
    MONGODB_HOST = "alex.mongohq.com"
    MONGODB_PORT = ""
    AWS_KEY = ''
    AWS_SECRET = ''


class DevelopmentConfig(Config):
    """ 
    The Development Configuration, provides default database and facebook credentials and
    configuration to run the application
    """ 
    SQLALCHEMY_DATABASE_URI = 'something local maybe?'
    FACEBOOK_APP_ID = ""
    FACEBOOK_APP_SECRET = ""
    CACHE_TYPE = 'simple'

class ProductionConfig(DevelopmentConfig):
    '''
    Extends and overrides declarations from the DevelopmentConfiguration
    '''
    FACEBOOK_APP_ID = ""
    FACEBOOK_APP_SECRET = ""
    DEBUG = False


def getConfig():
    ''' Should return the proper configuration based upon environmental 
        variables and or other subsequent tests. Currently only distinguishes
        between Heroku and 'other', defaulting other to a local development database.
        TODO: test for local development database, if failed, default to a remote
        database, there should be no need for a full postgres install to test 
        or write client/HTML/CSS/js.
    '''
    if os.environ.get('PYTHONHOME') != None and 'heroku' in os.environ.get('PYTHONHOME'): ##we are on Heroku!
        return ProductionConfig()
    else:
        return DevelopmentConfig()
