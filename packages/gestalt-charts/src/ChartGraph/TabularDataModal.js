// @flow strict-local
import { type Node, useState } from 'react';
import { Layer, Modal, useDefaultLabel } from 'gestalt';
import TabularDataModalFooter from './TabularDataModalFooter.js';
import TabularDataModalHeading from './TabularDataModalHeading.js';
import TabularDataModalTable from './TabularDataModalTable.js';
import useTabularData from './useTabularData.js';

interface Indexable {
  index(): number;
}

type Props = {|
  title: string,
  toggleTabularDataModal: () => void,
  data: $ReadOnlyArray<{|
    name: string | number,
    [string]: number,
  |}>,
  tickFormatter?: {|
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  |},
  labelMap?: {| [string]: string |},
  modalZIndex?: Indexable,
  isHorizontalLayout: boolean,
|};

export default function TabularDataModal({
  title,
  toggleTabularDataModal,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
  isHorizontalLayout,
}: Props): Node {
  const { tabularData } = useDefaultLabel('ChartGraph');

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [sortCol, setSortCol] = useState<null | 'series' | 'x' | 'y'>(null);

  const transformedTabularData = useTabularData({
    data,
    filterId: sortCol,
    filterOrder: sortOrder,
    tickFormatter,
    labelMap,
    isHorizontalLayout,
  });

  const onSortChange: ('series' | 'x' | 'y') => void = (value) => {
    if (sortCol !== value) {
      setSortCol(value);
      setSortOrder('desc');
    } else {
      setSortOrder((sortValue) => (sortValue === 'asc' ? 'desc' : 'asc'));
    }
  };

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        heading={
          <TabularDataModalHeading toggleTabularDataModal={toggleTabularDataModal} title={title} />
        }
        align="start"
        accessibilityModalLabel={tabularData}
        onDismiss={toggleTabularDataModal}
        size="sm"
        footer={
          <TabularDataModalFooter
            title={title}
            toggleTabularDataModal={toggleTabularDataModal}
            transformedTabularData={transformedTabularData}
            isHorizontalLayout={isHorizontalLayout}
          />
        }
      >
        <TabularDataModalTable
          isHorizontalLayout={isHorizontalLayout}
          title={title}
          transformedTabularData={transformedTabularData}
          onSortChange={onSortChange}
          sortOrder={sortOrder}
          sortCol={sortCol}
        />
      </Modal>
    </Layer>
  );
}
