import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Heading, Highlight, Box, Text, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const { Dragger } = Upload;

function UploadInput () {

  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const props = {
      name: 'company_csv',
      multiple: false,
      action: 'http://localhost:5000/api/v1/upload',
      maxCount: 1,
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          const companiesData = info.file.response.data;
          message.success(`${info.file.name} file uploaded successfully.`);
          setTimeout(() => {
            navigate('/results', {state: companiesData});
          }, 1000);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
      },
  };

  return (
        <Dragger {...props} style={{padding: '12px', color: `${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.92)' : '#1A202C'}`}}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <Heading as='h4' size='md'>Click or drag file to this area to upload</Heading>
          <Box as='div' mt={'12px'}>
            <Text fontSize={'18px'}>

            <Highlight query='CSV' styles={{ px: '1', py: '1', bg: 'orange.200', rounded: 'full' }}>
                Upload your CSV file to extract the companies data
            </Highlight>

            </Text>
          </Box>
        </Dragger>
  );
} 

export default UploadInput;