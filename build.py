from ifighthunger import utils, app, config
import os
if __name__ == '__main__':

	root = 'ifighthunger/static'
	for root,dirs,files in os.walk(root):
		for fil in files:
			filPath = os.path.join(root,fil)
			print filPath
			utils.uploadFile(file(filPath),filPath.replace('ifighthunger/',''), metaData = '',bucket='fighthunger') #TEST