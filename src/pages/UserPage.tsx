import React from 'react';
import { useGetCounterByNameQuery } from '../services/counter';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  TableCaption,
} from '@chakra-ui/react';
import moment from 'moment';
import { QueryParams } from '../types';

type Props = {
  match: {
    params: {
      userId: string;
    };
  };
};

const UserPage: React.VFC<Props> = (props) => {
  const today = moment().format('YYYY-MM-DDT00:00:00');
  const now = moment().format('YYYY-MM-DDTHH:mm:ss');
  const params: QueryParams = {
    name: props.match.params.userId,
    timestamp: today,
  };
  const { data, isLoading, isFetching } = useGetCounterByNameQuery(params, {
    pollingInterval: 30000,
  });

  const computeDuration = (ms: number) => {
    const h = String(Math.floor(ms / 3600000) + 100).substring(1);
    const m = String(Math.floor((ms - Number(h) * 3600000) / 60000) + 100).substring(1);
    const s = String(
      Math.round((ms - Number(h) * 3600000 - Number(m) * 60000) / 1000) + 100,
    ).substring(1);
    return h + ':' + m + ':' + s;
  };

  const echoTime = (startTime: string, endTime: string) => {
    const datetime1 = new Date(startTime);
    const datetime2 = new Date(endTime);
    const termDay = Number(datetime2) - Number(datetime1);
    return termDay;
  };

  const timingCharacter = (str: string) => {
    if (str === '0') {
      return '開始';
    }
    if (str === '1') {
      return '終了';
    }

    return '未設定';
  };

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Missing data!</div>;

  return (
    <Box p={4} minHeight="320px">
      <Heading mb={4}>
        合計時間：
        {computeDuration(
          data
            .map((item, index, data) => {
              if (data[index + 1]?.flag === '1') {
                return echoTime(item.timestamp, data[index + 1].timestamp);
              }
              return 0;
            })
            .reduce((acc, value) => acc + value),
        )}
      </Heading>
      {isFetching && (
        <Box alignItems="center" justifyContent="center" textAlign="center">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      )}
      <Table variant="simple" size="sm">
        <TableCaption>更新日時：{now}</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>UserId</Th>
            <Th>Timestamp</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index, data) => (
            <React.Fragment key={item.uid}>
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{item.userId}</Td>
                <Td>{item.timestamp}</Td>
                <Td>{timingCharacter(item.flag)}</Td>
              </Tr>
              {data[index + 1]?.flag === '1' && (
                <Tr>
                  <Td colSpan={4}>
                    経過時間 {computeDuration(echoTime(item.timestamp, data[index + 1].timestamp))}
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserPage;
