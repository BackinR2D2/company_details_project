import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'text/csv') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

export default upload;
