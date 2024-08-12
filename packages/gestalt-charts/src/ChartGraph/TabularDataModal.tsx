import { useCallback, useState } from 'react';
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
  title: string;
  toggleTabularDataModal: () => void;
  data: ReadonlyArray<{
    // @ts-expect-error - TS2411 - Property 'name' of type 'string | number' is not assignable to 'string' index type 'number'.
    name: string | number;
    [key: string]: number;
  }>;
  tickFormatter?: {
    timeseries?: (arg1: number) => string | number;
    xAxisTop?: (arg1: number, arg2: number) => string | number;
    xAxisBottom?: (arg1: number, arg2: number) => string | number;
    yAxisRight?: (arg1: number, arg2: number) => string | number;
    yAxisLeft?: (arg1: number, arg2: number) => string | number;
  };
  labelMap?: {
    [key: string]: string;
  };
  modalZIndex?: Indexable;
  isHorizontalLayout: boolean;
};

export default function TabularDataModal({
  title,
  toggleTabularDataModal,
  data,
  tickFormatter,
  labelMap,
  modalZIndex,
  isHorizontalLayout,
}: Props) {
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
