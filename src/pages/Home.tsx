import React from 'react';
import { useGetTotalTimeByNameQuery } from '../services/counter';
import moment from 'moment';
import { QueryParams2 } from '../types';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Home: React.VFC = () => {
  const lastWeek = moment().add(-7, 'days').format('YYYY-MM-DDT00:00:00');

  const params: QueryParams2 = {
    name: 'むつみ',
    timestamp: lastWeek,
  };
  const { data, isLoading } = useGetTotalTimeByNameQuery(params, {});

  const params2: QueryParams2 = {
    name: 'けい',
    timestamp: lastWeek,
  };
  const { data: data2, isLoading: isLoading2 } = useGetTotalTimeByNameQuery(params2, {});

  const echoDate = (param: string) => {
    const datetime = new Date(param);
    return datetime.toLocaleDateString();
  };

  if (isLoading) return <Box p={4}>Loading...</Box>;
  if (isLoading2) return <Box p={4}>Loading...</Box>;
  if (!data) return <Box p={4}>Missing data!</Box>;
  if (!data2) return <Box p={4}>Missing data!</Box>;

  return (
    <Box p={4}>
      <Box>
        <Heading size="md" mb={4}>
          むつみ
        </Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>TotalTime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.timestamp}>
                <Td>{echoDate(item.timestamp)}</Td>
                <Td>{item.totalTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box mt={4}>
        <Heading size="md" mb={4}>
          けい
        </Heading>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>TotalTime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data2.map((item) => (
              <Tr key={item.timestamp}>
                <Td>{echoDate(item.timestamp)}</Td>
                <Td>{item.totalTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Home;
