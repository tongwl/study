运行步骤：

1. 此文件目录需放在不包含中文字符的路径下
2. `npm install`
3. ``npm run build`` 或 ``webpack``
4. 在dist目录下找到index.html，运行即可
5. tips: 核心逻辑在entry.ts中，引用html2canvas和jspdf的方式可以是

```typescript
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
```

或

```typescript
const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');
```



