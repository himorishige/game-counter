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
  Select,
} from '@chakra-ui/react';
import moment from 'moment';
import { CounterList, QueryParams } from '../types';
import { useLocation, useHistory } from 'react-router-dom';

type Props = {
  match: {
    params: {
      userId: string;
    };
  };
};

const UserPage: React.VFC<Props> = (props) => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const history = useHistory();

  let today = '';
  if (query.get('date')) {
    today = `${query.get('date')}T00:00:00`;
  } else {
    today = moment().format('YYYY-MM-DDT00:00:00');
  }
  const nextDay = moment(today).add(1, 'days').format('YYYY-MM-DDT00:00:00');
  const now = moment().format('YYYY-MM-DDTHH:mm:ss');
  const params: QueryParams = {
    name: props.match.params.userId,
    timestamp: today,
    endtimestamp: nextDay,
  };
  const { data, isLoading, isFetching } = useGetCounterByNameQuery(params, {
    pollingInterval: 30000,
  });

  const changeHandler = (value: string) => {
    history.push(`/data/${props.match.params.userId}?date=${value}`);
  };

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

  if (isLoading) return <Box p={4}>Loading...</Box>;
  if (!data) return <Box p={4}>Missing data!</Box>;

  const totalTime = (logData: CounterList[]) => {
    return computeDuration(
      logData
        .map((item, index, org) => {
          if (org[index + 1]?.flag === '1') {
            return echoTime(item.timestamp, org[index + 1].timestamp);
          }
          return 0;
        })
        .reduce((acc, value) => acc + value, 0),
    );
  };

  return (
    <Box p={4} minHeight="320px">
      <Box pb={4}>
        <Select name="date" onChange={(event) => changeHandler(event.target.value)}>
          <option>select date</option>
          {[...Array(6)].map((_, i) => (
            <option key={i} value={moment().add(`-${i}`, 'days').format('YYYY-MM-DD')}>
              {moment().add(`-${i}`, 'days').format('YYYY-MM-DD')}
            </option>
          ))}
        </Select>
      </Box>
      <Heading mb={4}>
        合計時間：
        {totalTime(data)}
        {/* {computeDuration(
          data
            .map((item, index, data) => {
              if (data[index + 1]?.flag === '1') {
                return echoTime(item.timestamp, data[index + 1].timestamp);
              }
              return 0;
            })
            .reduce((acc, value) => acc + value, 0),
        )} */}
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
