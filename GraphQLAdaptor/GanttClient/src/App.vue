<template>
  <div>
    <ejs-gantt
      :dataSource="ganttDataManager"
      :taskFields="taskFields"
      :editSettings="editSettings"
      :toolbar="toolbar"
      :resourceFields="resourceFields"
      :resources="resources"
      height="400px"
    >
      <e-columns>
        <e-column field="TaskID" width="80" type="number" />
        <e-column field="TaskName" headerText="Job Name" width="250" />
        <e-column field="StartDate" type="dateTime" />
        <e-column field="EndDate" type="dateTime" />
        <e-column field="Duration" type="number" />
        <e-column field="Progress" type="number" />
        <e-column field="Predecessor" type="string" />
      </e-columns>
    </ejs-gantt>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data'
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Edit,
  Selection,
  Toolbar
} from '@syncfusion/ej2-vue-gantt'

// Inject services
provide('gantt', [Edit, Selection, Toolbar])

// Custom GraphQL adaptor
class GraphQLCrudAdaptor extends GraphQLAdaptor {
  processResponse(resData, ds, query, xhr, request) {

    if (resData && resData.data) {
      const data = resData.data

      if (data.getTasks) {
        return data.getTasks
      }

      if (data.updateTask) {
        return { result: data.updateTask }
      }

      if (data.addTask) {
        return { result: data.addTask }
      }

      if (data.deleteTask !== undefined) {
        return { result: data.deleteTask }
      }

      if (data.batchTasks) {
        return data.batchTasks
      }
    }

    return super.processResponse(resData, ds, query, xhr, request)
  }
}

// Config
const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  dependency: 'Predecessor',
  parentID: 'ParentId',
  segments: 'Segments',
  resourceInfo: 'ResourceInfos'
}

const resources = [
  { resourceId: 1, resourceName: 'Martin Tamer' },
  { resourceId: 2, resourceName: 'Rose Fuller' },
  { resourceId: 3, resourceName: 'Margaret Buchanan' },
  { resourceId: 4, resourceName: 'Fuller King' },
  { resourceId: 5, resourceName: 'Davolio Fuller' },
  { resourceId: 6, resourceName: 'Van Jack' },
  { resourceId: 7, resourceName: 'Fuller Buchanan' },
  { resourceId: 8, resourceName: 'Jack Davolio' },
  { resourceId: 9, resourceName: 'Tamer Vinet' },
  { resourceId: 10, resourceName: 'Vinet Fuller' },
  { resourceId: 11, resourceName: 'Bergs Anton' },
  { resourceId: 12, resourceName: 'Construction Supervisor' }
]

const resourceFields = {
  id: 'resourceId',
  name: 'resourceName',
  unit: 'resourceUnit',
  group: 'resourceGroup'
}

const editSettings = {
  allowAdding: true,
  allowEditing: true,
  allowDeleting: true,
  allowTaskbarEditing: true,
  showDeleteConfirmDialog: true
}

const toolbar = [
  'Add',
  'Edit',
  'Update',
  'Delete',
  'Cancel',
  'ExpandAll',
  'CollapseAll',
  'Indent',
  'Outdent'
]

// DataManager with GraphQL adaptor
const ganttDataManager = new DataManager({
  url: 'http://localhost:4205/',
  adaptor: new GraphQLCrudAdaptor({
    response: {
      result: 'getTasks.result',
      count: 'getTasks.count'
    },

    // READ query
    query: `
      query getTasks {
        getTasks {
          count
          result {
            TaskID
            TaskName
            StartDate
            EndDate
            Duration
            Progress
            ParentId
            Predecessor
            Segments {
              StartDate
              EndDate
              Duration
            }
            ResourceInfos {
              resourceId
              resourceName
              resourceGroup
              resourceUnit
            }
          }
        }
      }
    `,

    mutation: {
      update: 'updateTask',
      insert: 'addTask',
      remove: 'deleteTask'
    },

    // CRUD mutations
    getMutation(action) {

      if (action === 'insert') {
        return `
          mutation AddTask($value: GanttTaskInput!) {
            addTask(value: $value) {
              TaskID
              TaskName
              StartDate
              EndDate
              Duration
              Progress
              ParentId
              Predecessor
              Segments {
                StartDate
                EndDate
                Duration
              }
              ResourceInfos {
                resourceId
                resourceName
                resourceGroup
                resourceUnit
              }
            }
          }
        `
      }

      if (action === 'update') {
        return `
          mutation UpdateTask($value: GanttTaskInput!) {
            updateTask(value: $value) {
              TaskID
              TaskName
              StartDate
              EndDate
              Duration
              Progress
              ParentId
              Predecessor
              Segments {
                StartDate
                EndDate
                Duration
              }
              ResourceInfos {
                resourceId
                resourceName
                resourceGroup
                resourceUnit
              }
            }
          }
        `
      }

      if (action === 'remove') {
        return `
          mutation DeleteTask($key: ID!) {
            deleteTask(key: $key)
          }
        `
      }

      return ''
    }
  }),
  crossDomain: true
})
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-gantt/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-treegrid/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-notifications/styles/tailwind3.css";

/* For rich text editor in dialog notes tab */
@import "../node_modules/@syncfusion/ej2-richtexteditor/styles/tailwind3.css";
</style>
