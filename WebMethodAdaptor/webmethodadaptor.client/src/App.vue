<template>
  <div class="app">
    <ejs-gantt
      :dataSource="data"
      :taskFields="taskFields"
      :editSettings="editSettings"
      :toolbar="toolbar"
      height="400px"
    >
      <e-columns>
        <e-column
          field="TaskID"
          headerText="Task ID"
          textAlign="Right"
          width="90"
          type="number"
        />
        <e-column
          field="TaskName"
          headerText="Task Name"
          textAlign="Left"
          width="270"
        />
        <e-column
          field="StartDate"
          headerText="Start Date"
          textAlign="Right"
          width="150"
          format="yMd"
          type="dateTime"
        />
        <e-column
          field="EndDate"
          headerText="End Date"
          textAlign="Right"
          width="150"
          format="dd/MM/yyyy hh:mm"
          type="dateTime"
        />
        <e-column
          field="Duration"
          headerText="Duration"
          textAlign="Right"
          width="90"
          type="string"
        />
        <e-column
          field="Progress"
          headerText="Progress"
          textAlign="Right"
          width="120"
          type="number"
        />
      </e-columns>
    </ejs-gantt>
  </div>
</template>

<script setup>
import { DataManager, WebMethodAdaptor } from '@syncfusion/ej2-data'
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Edit,
  Selection,
  Toolbar
} from '@syncfusion/ej2-vue-gantt'


import { provide } from 'vue'
provide('gantt', [Edit, Selection, Toolbar])

// DataManager
const data = new DataManager({
  url: 'https://localhost:7052/api/Gantt',
  adaptor: new WebMethodAdaptor(),
  crossDomain: true
})

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  dependency: 'Dependency',
  parentID: 'ParentID'
}

const editSettings = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  allowTaskbarEditing: true
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