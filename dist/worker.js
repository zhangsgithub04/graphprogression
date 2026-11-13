importScripts('engine.js');
onmessage=e=>{try{postMessage({data:GraphEngine.analyze(e.data)})}catch(e){postMessage({error:e.message})}};
