<template>
  <div style="margin: 20px;">
    <h2>ODataV4Adaptor with Gantt</h2>

    <ejs-gantt
      id="Gantt"
      :dataSource="data"
      :taskFields="taskFields"
      :resourceFields="resourceFields"
      :resources="resources"
      :editSettings="editSettings"
      :toolbar="toolbar"
      :height="'400px'"
      :allowFiltering="true"
      :allowSorting="true"
      :allowReordering="true"
      :allowResizing="true"
      :enableContextMenu="true"
      :allowRowDragAndDrop="true"
      :columns="columns"
    />
  </div>
</template>

<script>
import { GanttComponent, Edit, Selection, Toolbar, ContextMenu, Filter, Sort, Reorder, Resize, VirtualScroll, RowDD } from '@syncfusion/ej2-vue-gantt';
import { DataManager } from '@syncfusion/ej2-data';
import { CustomAdaptor } from './customAdaptor';
import { onMounted } from 'vue';

export default {
  components: {
    'ejs-gantt': GanttComponent
  },

  data() {
    return {
      // ✅ DataManager
      data: new DataManager({
        url: 'https://localhost:7284/odata/GanttTasks',
        adaptor: new CustomAdaptor(),
        key: 'TaskID',
        crossDomain: true
      }),

      // ✅ Task fields
      taskFields: {
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
      },

      // ✅ Resource fields
      resourceFields: {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'resourceUnit',
        group: 'resourceGroup'
      },

      // ✅ Resources
      resources: [
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
      ],

      // ✅ Edit Settings
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true
      },

      // ✅ Toolbar
      toolbar: [
        'Add', 'Edit', 'Update', 'Delete',
        'Cancel', 'ExpandAll', 'CollapseAll',
        'Indent', 'Outdent'
      ],

      // ✅ Columns
      columns: [
        { field: 'TaskID', headerText: 'Task ID', textAlign: 'Right', width: 90, type: 'number', isPrimaryKey: true },
        { field: 'TaskName', headerText: 'Task Name', width: 250 , type: 'string' },
        { field: 'StartDate', headerText: 'Start Date', format: 'yMd', width: 150,type: 'datetime' },
        { field: 'EndDate', headerText: 'End Date', format: 'dd/MM/yyyy hh:mm', width: 150,type: 'datetime' },
        { field: 'Duration', headerText: 'Duration', type: 'number', width: 100 },
        { field: 'Progress', headerText: 'Progress', type: 'number', width: 100 }
      ]
    };
    onMounted(() => {
        const script = document.createElement('script')
        script.src = "https://cdn.syncfusion.com/ej2/syncfusion-helper.js"
        script.async = true
        document.head.appendChild(script)
    });
    



  },
  provide: {
    gantt: [Edit, Selection, Toolbar, ContextMenu, Filter, Sort, Reorder, Resize, VirtualScroll, RowDD]
  }
  
};
</script>