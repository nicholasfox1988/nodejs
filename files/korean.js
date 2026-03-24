
        let excelData = [];
        let currentResult= '';
        // let resultObj= {"bis":0,"cp":0,"pick up":0,"no deal":0};

        const vm1= new Vue({
            el: '#showing',
            data(){
                return{
                    htmlContent:"这里显示查询结果",
                    inputValue:"",
                    total:{}
                }
            }
        });
        
        document.getElementById('fileInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                // Get the last sheet
                const lastSheetName = workbook.SheetNames[workbook.SheetNames.length-1];
                const worksheet = workbook.Sheets[lastSheetName];
                
                // Convert to JSON
                const jsonData1 = XLSX.utils.sheet_to_json(worksheet);
                const jsonData2 = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const headers = jsonData2[0];
                // console.log(headers);                
                // console.log(jsonData1);
                // Process the data
                excelData = jsonData1.map(row => {
                    const no = row[headers[1]];
                    const px = no.toString().slice(-3);
                    return {                        
                        px: px,
                        delivery: row[headers[7]] ,
                        ctns: row[headers[2]],
                        consignee: row[headers[0]],
                        // pay:row[headers[6]],
                        no: no,
                        date:row[headers[8]] 
                    };
                }).filter(row => row.no);

                excelData.map(row => {
                    if (!row.delivery || !row.date) row.delivery="不处理";
                });

                excelData.sort((a,b)=>{
                    const nameA = a['delivery'].toUpperCase(); // 忽略大小写
                    const nameB = b['delivery'].toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                let orderSummary=excelData.reduce((acc,row)=>{
                    const {delivery,ctns} =row;
                    if (!acc[delivery]) acc[delivery]=0;
                    acc[delivery]+= ctns;
                    return acc;
                },{});
                // resultObj['bis']= excelData.filter(row => row.delivery.toUpperCase()==='BIS').reduce((sum,row)=> sum + row['ctns'],0);

                // console.log(excelData);
                // Display all data initially
                vm1.total=orderSummary;
                displayData(excelData);
                downLoad(excelData,file.name);
            };
            reader.readAsArrayBuffer(file);
        });
        
        function displayData(data) {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="no-results">No data found</td></tr>';
                return;
            }
            
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.px}</td>
                    <td>${row.delivery}</td>
                    <td>${row.ctns}</td>
                    <td>${row.consignee}</td>
                    <td>${row.no}</td>                    
                `;
                tableBody.appendChild(tr);
            });            
        }

        function downLoad(excelData,fileName){
            if (window.confirm("是否要保存？")) {
                const workbook1 = XLSX.utils.book_new();

                // 将 JSON 数据转换为工作表
                const worksheet1 = XLSX.utils.json_to_sheet(excelData);

                // 将工作表添加到工作簿
                XLSX.utils.book_append_sheet(workbook1, worksheet1, "Sheet1");

                // 保存工作簿为 Excel 文件
                XLSX.writeFile(workbook1, "done_"+fileName);
            } else {
                // 用户点击了取消，执行取消操作
                console.log("用户点击了取消");
                // 这里可以添加取消保存的代码
            }
        }

        function searchData() {
            const searchTerm = document.getElementById('searchInput').value.trim();
            const filteredData = excelData.filter(row => 
                row.px.includes(searchTerm)
            );
            if(filteredData.length===0){
                vm1.htmlContent="找不到";
                document.getElementById('searchInput').value='';
                currentResult="找不到";
                speakResult();
            }else{
                vm1.htmlContent=filteredData[0].delivery+'<br><br>'+filteredData[0].px+'<br><br>'+filteredData[0].ctns+'<br><br>'+filteredData[0].consignee;    
                currentResult=filteredData[0].delivery;
                document.getElementById('searchInput').value='';
                speakResult();
            };
        }
        
        function speakResult() {
            if (!currentResult) {
                alert('没有可发音的内容');
                return;
            }
            
            // 使用Web Speech API发音
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentResult);
                utterance.lang = 'en-US'; // 设置为中文
                utterance.rate = 1.0; // 语速
                utterance.pitch = 1.0; // 音高
                utterance.volume = 1.0; // 音量
                
                speechSynthesis.speak(utterance);
            } else {
                alert('您的浏览器不支持语音合成功能');
            }

        }

        // Allow search on Enter key
        document.getElementById('searchInput').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchData();
            }
        });
    