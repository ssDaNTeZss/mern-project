exports.accountPhotoController = async (req, res) => {
    try {
        console.log("DA");
        if (!req.files) {
            return res.status(400).json({message: 'No file uploaded'});
        }
        console.log(req.files);
        const file = req.files.file;
        console.log("DA2");

        file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'});
    }
};