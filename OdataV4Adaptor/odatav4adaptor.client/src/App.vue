<template>
  <div style="margin: 20px">
    <ejs-gantt
      :dataSource="data"
      :taskFields="taskFields"
      :resourceFields="resourceFields"
      :resources="resources"
      :editSettings="editSettings"
      :toolbar="toolbar"
      :enableContextMenu="true"
      height="400px"
    >
      <e-columns>
        <e-column
          field="TaskID"
          headerText="Task ID"
          textAlign="Right"
          width="90"
          type="number"
          :isPrimaryKey="true"
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
          type="number"
          width="90"
        />
        <e-column
          field="Progress"
          headerText="Progress"
          textAlign="Right"
          width="120"
        />
      </e-columns>
    </ejs-gantt>
  </div>
</template>

<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data'
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Edit,
  Selection,
  Toolbar,
  ContextMenu
} from '@syncfusion/ej2-vue-gantt'

import { provide } from 'vue'
provide('gantt', [Edit, Selection, Toolbar, ContextMenu])

// DataManager
const data = new DataManager({
  url: 'https://localhost:7199/odata/GanttTasks',
  adaptor: new ODataV4Adaptor(),
  key: 'TaskID',
  crossDomain: true
})

const resourceFields = {
  id: 'resourceId',
  name: 'resourceName',
  unit: 'resourceUnit',
  group: 'resourceGroup'
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

const taskFields = {
  id: 'TaskID',
  name: 'TaskName',
  startDate: 'StartDate',
  endDate: 'EndDate',
  duration: 'Duration',
  progress: 'Progress',
  dependency: 'Dependency',
  parentID: 'ParentID',
  segments: 'Segments',
  resourceInfo: 'ResourceInfos'
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
