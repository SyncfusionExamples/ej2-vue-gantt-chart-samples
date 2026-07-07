<template>
  <div>
    <!-- ✅ Render only after data is ready -->
    <ejs-gantt
      v-if="data"
      :dataSource="data"
      :taskFields="taskFields"
      :editSettings="editSettings"
      :toolbar="toolbarOptions"
      :allowSelection="true"
      height="400px"
    >
      <e-columns>
        <e-column field="taskId" headerText="Task ID" textAlign="Right" width="90" type="number" />
        <e-column field="taskName" headerText="Task Name" textAlign="Left" width="270" />
        <e-column field="startDate" headerText="Start Date" textAlign="Right" width="150" format="yMd" type="dateTime" />
        <e-column field="endDate" headerText="End Date" textAlign="Right" width="150" format="dd/MM/yyyy hh:mm" type="dateTime" />
        <e-column field="duration" headerText="Duration" textAlign="Right" width="90" type="number" />
        <e-column field="progress" headerText="Progress" textAlign="Right" width="120" type="number" />
      </e-columns>
    </ejs-gantt>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data'
import {
  GanttComponent as EjsGantt,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Edit,
  Selection,
  Toolbar
} from '@syncfusion/ej2-vue-gantt'

provide('gantt', [Edit, Selection, Toolbar])

const data = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('https://localhost:7007/api/gantt')
    const result = await res.json()

    data.value = new DataManager({
      json: result,
      adaptor: new RemoteSaveAdaptor(),
      batchUrl: 'https://localhost:7007/api/gantt/Batch',
      enableOffline: true
    })
  } catch (err) {
    console.error('Error loading data:', err)
  }
})

const taskFields = {
  id: 'taskId',
  name: 'taskName',
  startDate: 'startDate',
  endDate: 'endDate',
  duration: 'duration',
  progress: 'progress',
  parentID: 'parentId'
}

const editSettings = {
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true,
  allowTaskbarEditing: true
}

const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
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