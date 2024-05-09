import { useState } from 'react';
import { Dropzone } from '@files-ui/react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, listAll } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { getAuth } from 'firebase/auth';
import { toast } from 'sonner';

// eslint-disable-next-line react/prop-types
export const DragAndDrop = ({ className }) => {
    const navigate = useNavigate();
    const [files] = useState([]);

    const handleFileChange = async (files) => {
        const file = files[0].file;
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && file) {
            const userEmail = user.email.replace('.', ',');
            const userFolder = `uploads/${userEmail}/`;

            const folderRef = ref(storage, userFolder);

            const fileList = await listAll(folderRef)
                .then((res) => res.items.length)
                .catch((error) => {
                    console.error('Error listing files: ', error);
                    return 0;
                });

            const fileNumber = fileList + 1;
            const storageRef = ref(storage, `${userFolder}${fileNumber}.csv`);
            console.log('Uploading file:', `${userFolder}${fileNumber}.csv`);

            await uploadBytes(storageRef, file)
                .then(() => {
                    console.log('File uploaded successfully');
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error('Error uploading file: ', error);
                });
            toast.success('File uploaded succesfully');
        } else {
            console.error('User is not logged in or file is not selected');
        }
    };

    return (
        <Dropzone
            header={false}
            value={files}
            footer={false}
            maxFiles={1}
            label="Drop here your csv file"
            onChange={handleFileChange}
            className={className}
            color='white'
            accept='text/csv'
        />
    );
};