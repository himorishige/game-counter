import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';

const Header: React.VFC = () => {
  const history = useHistory();

  return (
    <Stack direction="row" p={4}>
      <Button colorScheme="blue" onClick={() => history.push('/data/むつみ')}>
        むつみ
      </Button>
      <Button colorScheme="red" onClick={() => history.push('/data/けい')}>
        けい
      </Button>
    </Stack>
  );
};

export default Header;
