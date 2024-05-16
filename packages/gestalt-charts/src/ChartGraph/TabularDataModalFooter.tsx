import { ReactNode } from 'react';
import { Button, ButtonGroup, Flex, useDefaultLabel } from 'gestalt';
import { TransformedTabularDataType, useBuildCsvData } from './useTabularData';

type Props = {
  title: string;
  toggleTabularDataModal: () => void;
  isHorizontalLayout: boolean;
  transformedTabularData: TransformedTabularDataType;
};

export default function TabularDataModalFooter({
  title,
  toggleTabularDataModal,
  isHorizontalLayout,
  transformedTabularData,
}: Props) {
  const { downloadCsvButtonText, cancelButtonText } = useDefaultLabel('ChartGraph');

  const csvData = useBuildCsvData({
    transformedTabularData,
    isHorizontalLayout,
  });

  const encodedData = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
  return (
    <Flex justifyContent="end">
      <ButtonGroup>
        <Button color="gray" onClick={toggleTabularDataModal} text={cancelButtonText} />
        <a download={`${title.toLowerCase().replace(' ', '_')}.csv`} href={encodedData}>
          <Button color="red" iconEnd="download" text={downloadCsvButtonText} />
        </a>
      </ButtonGroup>
    </Flex>
  );
}
