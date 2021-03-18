import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { gql, useLazyQuery } from '@apollo/client';
import { useAllTodosLazyQuery } from '@/generated/graphql';
const { Option } = Select;

const columns = [
  {
    title: 'task',
    dataIndex: 'task',
    sorter: true,
    // render: node => `${node.task}`,
    width: '20%',
  },
  {
    title: 'done',
    dataIndex: 'id',
    // render: node => `${node.id}`,
    filters: [
      { text: 'T', value: true },
      { text: 'F', value: false },
    ],
    width: '20%',
  },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  // },
];

let initPagination: TablePaginationConfig = {
  current: 1,
  pageSize: 2,
};
const buildFilter = (value) => {
  return {
    task: { includes: value.task },
  };
};

const getVariables = (pagination: TablePaginationConfig, formData: any) => {
  const filter = buildFilter(formData);
  return {
    first: pagination.pageSize,
    offset: (pagination.current - 1) * pagination.pageSize,
    filter,
  };
};

export default function Foo() {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState(initPagination);
  const [loadGreeting, { called, loading, data }] = useAllTodosLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const load = (pagination: TablePaginationConfig, formData: any) => {
    let variables: any = getVariables(pagination, formData);
    loadGreeting({ variables });
  };

  useEffect(() => {
    load(pagination, form.getFieldsValue());
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters,
    sorter,
  ) => {
    setPagination((pre) => {
      let newPagination = { ...pre, ...pagination };
      load(newPagination, form.getFieldsValue());
      return newPagination;
    });
  };

  return (
    <div>
      <Form
        form={form}
        name="control-hooks"
        onFinish={(condition) => {
          setPagination((pre) => {
            let newPagination = { ...pre, current: 1 };
            load(newPagination, condition);
            return newPagination;
          });
        }}
      >
        <Form.Item name="task" label="Note">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              setPagination((pre) => {
                form.resetFields();
                let newPagination = { ...pre, current: 1 };
                load(newPagination, form.getFieldsValue());
                return newPagination;
              });
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        rowKey={(record) => record.nodeId}
        dataSource={data?.allTodos?.nodes}
        pagination={{ ...pagination, total: data?.allTodos?.totalCount }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}
