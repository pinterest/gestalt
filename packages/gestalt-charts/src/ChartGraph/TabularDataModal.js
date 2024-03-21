// @flow strict-local
import { type Node as ReactNode, useCallback, useState } from 'react';
import { Layer, Modal, useDefaultLabel } from 'gestalt';
import TabularDataModalFooter from './TabularDataModalFooter';
import TabularDataModalHeading from './TabularDataModalHeading';
import TabularDataModalTable from './TabularDataModalTable';
import useTabularData, {
  type FilterIdType,
  type FilterOrderType,
  type SortChangeType,
  type TransformedTabularDataType,
} from './useTabularData';

interface Indexable {
  index(): number;
}

type Props = {
  title: string,
  toggleTabularDataModal: () => void,
  data: $ReadOnlyArray<{
    name: string | number,
    [string]: number,
  }>,
  tickFormatter?: {
    timeseries?: (number) => string | number,
    xAxisTop?: (number, number) => string | number,
    xAxisBottom?: (number, number) => string | number,
    yAxisRight?: (number, number) => string | number,
    yAxisLeft?: (number, number) => string | number,
  },
  labelMap?: { [string]: string },
  modalZIndex?: Indexable,
  isHorizontalLayout: boolean,
};

export default function TabularDataModal({
  title,
  toggleTabularDataModal,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
  isHorizontalLayout,
}: Props): ReactNode {
  const { tabularData } = useDefaultLabel('ChartGraph');

  const [sortOrder, setSortOrder] = useState<FilterOrderType>('desc');
  const [sortCol, setSortCol] = useState<FilterIdType>(null);

  const transformedTabularData: TransformedTabularDataType = useTabularData({
    data,
    filterId: sortCol,
    filterOrder: sortOrder,
    tickFormatter,
    labelMap,
    isHorizontalLayout,
  });

  const onSortChange = useCallback(
    (value: SortChangeType) => {
      if (sortCol !== value) {
        setSortCol(value);
        setSortOrder('desc');
      } else {
        setSortOrder((sortValue) => (sortValue === 'asc' ? 'desc' : 'asc'));
      }
    },
    [sortCol],
  );

  return (
    <Layer zIndex={modalZIndex}>
      <Modal
        accessibilityModalLabel={tabularData}
        align="start"
        footer={
          <TabularDataModalFooter
            isHorizontalLayout={isHorizontalLayout}
            title={title}
            toggleTabularDataModal={toggleTabularDataModal}
            transformedTabularData={transformedTabularData}
          />
        }
        heading={
          <TabularDataModalHeading title={title} toggleTabularDataModal={toggleTabularDataModal} />
        }
        onDismiss={toggleTabularDataModal}
        size="sm"
      >
        <TabularDataModalTable
          isHorizontalLayout={isHorizontalLayout}
          onSortChange={onSortChange}
          sortCol={sortCol}
          sortOrder={sortOrder}
          title={title}
          transformedTabularData={transformedTabularData}
        />
      </Modal>
    </Layer>
  );
}
