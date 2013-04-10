#
# @author Cory Dolphin
# @wcdolphin
#

from ifighthunger import app
import models
import facebook
from boto.s3.bucket import Bucket
from boto.s3.connection import S3Connection
from boto.s3.key import Key
def getFacebookUserObj(request):
    
    return facebook.get_user_from_cookie(request.cookies, app.config['FACEBOOK_APP_ID'], app.config['FACEBOOK_APP_SECRET'])

def firstOrNone(aList):
    '''
    Simple helper to return first element of a list if it is the only element
    '''
    return aList[0] if len(aList) == 1 else  None

def intOrNone(aStr):
    '''
    Simple helper to cast to an int, returning an int or None, rather than an error
    '''
    if isinstance(aStr,int):
        return aStr
    try:
        return int(aStr)
    except (TypeError, ValueError) as ve:
        return None

def uploadFile(aFile,path,callBack = None, bucket=None, public=True, metaData =('Content-Type', 'image/png'),cb=None):
    '''
    Handle file uploads to S3, defaulting to the configured bucket, and to public ACL status
    #TODO: evaluate success of invocation? Was it usccesful?
    '''
    conn = S3Connection(app.config['AWS_KEY'],app.config['AWS_SECRET'])
    b = conn.create_bucket(bucket)
    k = Key(b)
    k.key = path
    if metaData:
        k.set_metadata(*metaData)

    k.set_contents_from_file(aFile, rewind=True, cb=cb)
    if public:
        k.set_acl('public-read')