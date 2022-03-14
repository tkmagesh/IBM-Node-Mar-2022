 (function(){
    function doWork(workComplete, workProgress){
        var totalIterations = 1000,
            currentIteration = 0;

        function oneIteration(){
            for(var i=0; i <( 10000 / totalIterations); i++)
            for(var j=0; j <10000; j++)
            for(var k=0; k <500; k++){

            }
            currentIteration++
            if (currentIteration % 10 === 0){
                var percentageWorkCompleted = (currentIteration/totalIterations) * 100;
                workProgress(percentageWorkCompleted)
            }
            if (currentIteration < totalIterations){
                setTimeout(oneIteration)
            } else {
                console.log('Job Done!!')
                workComplete()
            }
        }
        setTimeout(oneIteration)
    }
    function displayMessage(msg){
        document.getElementById('divMessages').innerHTML += msg + '<br/>'
    }
    function onBtnDoWorkClick(){
        displayMessage('Work Started')
        doWork(onWorkCompletion, onWorkProgress);
    }
    function onWorkCompletion(){
        displayMessage('Work completed')
    }
    function onWorkProgress(percentageWorkCompleted){
        document.getElementById('workProgress').value = percentageWorkCompleted;
    }
    function onDocumentLoad(){
        var btnDoWork = document.getElementById('btnDoWork');
        btnDoWork.addEventListener('click', onBtnDoWorkClick)
    }
    window.addEventListener('DOMContentLoaded', onDocumentLoad)
})()