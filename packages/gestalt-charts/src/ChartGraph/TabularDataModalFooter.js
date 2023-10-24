// @flow strict-local
import { type Node } from 'react';
import { Button, ButtonGroup, Flex, useDefaultLabel } from 'gestalt';
import { type TransformedTabularDataType, useBuildCsvData } from './useTabularData.js';

type Props = {
  title: string,
  toggleTabularDataModal: () => void,
  isHorizontalLayout: boolean,
  transformedTabularData: TransformedTabularDataType,
};

export default function TabularDataModalFooter({
  title,
  toggleTabularDataModal,
  isHorizontalLayout,
  transformedTabularData,
}: Props): Node {
  const { downloadCsvButtonText, cancelButtonText } = useDefaultLabel('ChartGraph');

  const csvData = useBuildCsvData({
    transformedTabularData,
    isHorizontalLayout,
  });

  const encodedData = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
  return (
    <Flex justifyContent="end">
      <ButtonGroup>
        <Button color="gray" text={cancelButtonText} onClick={toggleTabularDataModal} />
        <a href={encodedData} download={`${title.toLowerCase().replace(' ', '_')}.csv`}>
          <Button color="red" text={downloadCsvButtonText} iconEnd="download" />
        </a>
      </ButtonGroup>
    </Flex>
  );
}
