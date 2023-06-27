import { parseISO, format } from 'date-fns';
import { FC } from 'react';

type Props = {
  dateString: string;
}
const Date:FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy/MM/dd')}</time>;
}
export default Date;
