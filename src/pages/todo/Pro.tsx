import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, message } from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { TablePaginationConfig } from 'antd/lib/table';
import { client } from '@/index';
import { gql } from '@apollo/client';
import ProForm, {
  ModalForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import {
  AllTodosDocument,
  CreateTodoDocument,
  DeleteTodoDocument,
} from '@/generated/graphql';
import { observer, useLocalObservable } from 'mobx-react';
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
interface GithubIssueItem {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}
const columns: ProColumns<{ nodeId: string; task: string; done: boolean }>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'task',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'done',
    initialValue: 'open',
    filters: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  //   {
  //     title: '标签',
  //     dataIndex: 'labels',
  //     renderFormItem: (_, { defaultRender }) => {
  //       return defaultRender(_);
  //     },
  //     render: (_, record) => (
  //       <Space>
  //         {record.labels.map(({ name, color }) => (
  //           <Tag color={color} key={name}>
  //             {name}
  //           </Tag>
  //         ))}
  //       </Space>
  //     ),
  //   },
  //   {
  //     title: '创建时间',
  //     key: 'created_at',
  //     dataIndex: 'created_at',
  //     valueType: 'date',
  //   },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.nodeId);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <a
        rel="noopener noreferrer"
        key="delete"
        onClick={async (e) => {
          const res = await client.mutate({
            mutation: DeleteTodoDocument,
            variables: { input: { nodeId: record.nodeId } },
          });
          action.reload();
        }}
      >
        删除
      </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={(key) => action.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //   ]}
      // />,
    ],
  },
];
const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

const getCurrent = (total: number, size: number) => {
  if (total % size > 0) {
    return total / size + 1;
  } else {
    return total / size;
  }
};

export default observer(() => {
  const actionRef = useRef<ActionType>(null);
  const state = useLocalObservable(() => ({
    current: 0,
  }));
  return (
    <ProTable<{ task: string; nodeId: string; done: boolean }>
      columns={columns}
      actionRef={actionRef}
      request={(params) => {
        console.log('fetch');
        return client
          .query({
            query: AllTodosDocument,
            variables: getVariables(params, {}),
          })
          .then((res) => {
            let newCurrent = getCurrent(
              res.data.allTodos.totalCount,
              params.pageSize,
            );
            if (newCurrent < params.current) {
              // state.current = newCurrent;
              return {
                data: res.data.allTodos.nodes,
                success: true,
                total: res.data.allTodos.totalCount,
              };
            } else {
              // state.current = params.current;
              return {
                data: res.data.allTodos.nodes,
                success: true,
                total: res.data.allTodos.totalCount,
              };
            }
          });
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="nodeId"
      search={{
        labelWidth: 'auto',
      }}
      onReset={() => {
        console.log('reset');
      }}
      pagination={{
        pageSize: 5,
        // current: state.current
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <ModalForm
          title="新建表单"
          key="addMOdal"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建任务
            </Button>
          }
          modalProps={{
            onCancel: () => console.log('run'),
          }}
          onFinish={async (values) => {
            // await waitTime(2000);
            const res = await client.mutate({
              mutation: CreateTodoDocument,
              variables: { input: { todo: values } },
            });
            console.log(values);
            message.success('提交成功');
            actionRef.current.reload();
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="task"
              label="任务名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
            />
            <ProFormText
              width="md"
              name="done"
              label="完成情况"
              placeholder="请输入"
            />
          </ProForm.Group>
          {/* <ProForm.Group>
        <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
        <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
      </ProForm.Group> */}
          {/* <ProFormText width="xs" name="mangerName" label="商务经理" initialValue="启途" /> */}
        </ModalForm>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
});
