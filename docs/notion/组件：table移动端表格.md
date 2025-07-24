> 类似element-plus table组件；支持列宽度设置，以及嵌套表格

## 问题：

1. 在不设置固定宽度的情况下，每列宽度如何对齐；
2. 固定前n列或后几列如何实现；（fixed：left | right）；
3. minWidth, maxWidth, width等属性
4. 虚拟滚动；

## TableWidget


```javascript
import { DotLoading } from 'antd-mobile';
import { DownOutline, UpOutline } from 'antd-mobile-icons';
import React, { CSSProperties, ReactNode } from 'react';
import './table.less';

// 列配置接口
interface Column<T = any> {
  key: string;
  title: string;
  isExpandable?: boolean;
  width?: string | number;
  render?: (row: T) => React.ReactNode;
}

// 表格组件Props接口
interface TableWidgetProps<T = any> {
  columns: Column<T>[];
  data: T[];
  children?: ReactNode;
  expandedRow?: string | null;
  loading?: boolean;
  showEmpty?: boolean;
  showLoading?: boolean;
  setExpandedRow?: (id: string | null) => void;
  expandRender?: (row: { data: T }) => ReactNode;
  onExpandRow?: (row: T, index: number) => void;
  onRowClick?: (row: T) => void;
}

const TableWidget = <T extends { id: string }>({
  columns,
  data,
  expandedRow,
  loading = false,
  showEmpty = false,
  showLoading = false,
  setExpandedRow = () => {},
  expandRender = () => <></>,
  onExpandRow = () => {},
  onRowClick = () => {},
}: TableWidgetProps<T>) => {
  // 处理行展开
  const handleRowExpand = (e: React.MouseEvent, row: T, index: number) => {
    e.stopPropagation();
    setExpandedRow(expandedRow === row.id ? null : row.id);
    onExpandRow(row, index);
  };

  const getColumnStyle = (index, col) => {
    // 粘性布局
    const positionStyle = index === 0 ? 'sticky' : 'static';
    const leftStyle = index === 0 ? 0 : undefined;

    // 处理 flex 样式
    let flexStyle: {
      minWidth: string;
      maxWidth: string;
      width: string | number;
      flexGrow: number;
      flexShrink: number;
    } = {
      minWidth: 'auto',
      maxWidth: 'auto',
      width: 'auto',
      flexGrow: 1,
      flexShrink: 1,
    };
    if (col?.width) {
      flexStyle.maxWidth = `${typeof col.width === 'number' ? `${col.width}px` : col.width}`;
      flexStyle.minWidth = `${typeof col.width === 'number' ? `${col.width}px` : col.width}`;
      flexStyle.flexGrow = 0;
      flexStyle.flexShrink = 0;
    } else {
      flexStyle.width = 0;
      flexStyle.minWidth = '120px';
    }

    return {
      position: positionStyle,
      left: leftStyle,
      background: '#fff',
      ...flexStyle,
    } as CSSProperties;
  };

  // 渲染表头
  const renderHeader = () => (
    <div className="table-header">
      {columns.map((col, index) => (
        <div
          className={col.isExpandable ? 'table-col__expand' : ''}
          style={getColumnStyle(index, col)}
          key={col.key}
        >
          {col.title}
        </div>
      ))}
    </div>
  );

  // 渲染单元格内容
  const renderCell = (col: Column<T>, row: T, index: number) => {
    if (col?.render) {
      return col.render(row);
    }
    return (
      <span className="table-col__span">
        {col.key === 'index' ? index + 1 : (row[col.key as keyof T] as string)}
      </span>
    );
  };

  // 渲染展开图标
  const renderExpandIcon = (row: T, index: number) => (
    <span
      className={expandedRow === row.id ? 'expand-icon__active expand-icon' : 'expand-icon'}
      onClick={(e) => handleRowExpand(e, row, index)}
    >
      {expandedRow === row.id ? <DownOutline fontSize={12} /> : <UpOutline fontSize={12} />}
    </span>
  );

  // 渲染数据行
  const renderRows = () => (
    <>
      {data?.map((row, index) => (
        <React.Fragment key={row.id + '$' + index}>
          <div className="table-row">
            {columns.map((col, _i) => (
              <div
                key={col.key + row.id}
                className={col.isExpandable ? 'table-col__expand' : ''}
                style={getColumnStyle(_i, col)}
                onClick={() => onRowClick(row)}
              >
                {col.isExpandable && renderExpandIcon(row, index)}
                {renderCell(col, row, index)}
              </div>
            ))}
          </div>
          {expandedRow === row.id && (
            <div className="table-row-expand">{expandRender({ data: row })}</div>
          )}
        </React.Fragment>
      ))}
    </>
  );

  // 渲染空状态
  const renderEmpty = () => (
    <div
      style={{
        width: '100%',
        background: '#fff',
        fontSize: '12px',
        textAlign: 'center',
        lineHeight: '32px',
        color: '#919495',
      }}
    >
      暂无数据
    </div>
  );

  // 渲染加载状态
  const renderLoading = () => (
    <div style={{ textAlign: 'center', background: '#fff' }}>
      <DotLoading color="primary" />
    </div>
  );

  return (
    <div className="table-box">
      <div className="table-container__wrapper">
        {renderHeader()}
        {!data?.length && !loading && showEmpty && renderEmpty()}
        {loading && !data?.length && showLoading && renderLoading()}
        {data?.length > 0 && renderRows()}
      </div>
    </div>
  );
};

export default TableWidget;
```



table.less


```less
.table-box {
  width: 100%;
  overflow: auto;
}
.table-container__wrapper {
  float: left;
  min-width: 100%;
}

.table-header,
.table-row {
  display: flex;
  clear: both;
  min-width: 100%;
  color: #919495;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
  transition: all 0.3s ease;

  > div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    * {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

.table-header {
  font-weight: 500;
}

.table-row {
  color: #4f4e59;
  & > div {
    align-self: center;
  }
}

.table-row-expand {
  background: #f3f3f3;
}
.table-col__expand {
  display: flex;

  align-items: center;
  justify-content: flex-start;
}

.expand-icon {
  display: inline-block;

  text-align: center;
  background: #f7f8fa;
}
.expand-icon__active {
  color: #4d8ded;
  background: rgba(77, 141, 237, 0.12);
}

@media screen and (orientation: portrait) {
  .table-header,
  .table-row {
    font-size: 12px;
    > div {
      padding: 6px;
    }
  }

  .table-row-expand {
    padding: 4px;
  }

  .table-col__expand {
    gap: 3px;
    min-width: 50px;
    max-width: 50px;
    box-shadow: 5px 0 5px #f6f6f6;
  }
  .table-col__span {
    font-size: 12px !important;
  }

  .expand-icon {
    padding: 3px 4px;
    line-height: 6px;
    border-radius: 3px;
  }
}

@media screen and (orientation: landscape) {
  .table-header,
  .table-row {
    font-size: 12px;
    > div {
      padding: 6px;
    }
  }

  .table-row-expand {
    padding: 4px;
  }

  .table-col__expand {
    gap: 3px;
    min-width: 50px;
    max-width: 50px;
    box-shadow: 5px 0 5px #f6f6f6;
  }

  .table-col__span {
    font-size: 12px !important;
  }

  .expand-icon {
    padding: 3px 4px;
    line-height: 6px;
    border-radius: 3px;
  }
}
```


## 使用示例


```less
<TableWidget
  data={tableData}
  loading={loading}
  columns={}
  expandedRow={expandRow}
  setExpandedRow={setExpandRow}
  onRowClick={(row) => handleClickRow(row)}
  onExpandRow={(row) => handleExpandRow(row)}
  expandRender={(row) => (
    <TableWidget
      data={row.data.expandData}
      loading={expandTableLoading}
      showLoading={true}
      showEmpty={true}
      columns={taskColumns}
      onRowClick={(row) => handleClickRow(row)}
    ></TableWidget>
  )}
></TableWidget>
```

