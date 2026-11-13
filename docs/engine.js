/* Exact dynamics on labeled, simple, undirected graphs. Bit i encodes pair i. */
(function(root){
function analyze(n){
 if(!Number.isInteger(n)||n<1||n>6)throw Error('Choose an integer from 1 to 6.');
 const pairs=[];for(let u=0;u<n;u++)for(let v=u+1;v<n;v++)pairs.push([u,v]);
 const count=2**pairs.length,next=new Int32Array(count),indeg=new Int32Array(count);
 for(let s=0;s<count;s++){const d=new Uint8Array(n);pairs.forEach(([u,v],i)=>{if(s&(1<<i)){d[u]++;d[v]++;}});let t=0;pairs.forEach(([u,v],i)=>{if(Boolean(s&(1<<i))!==(d[u]===d[v]))t|=1<<i;});next[s]=t;indeg[t]++;}
 const queue=[];for(let s=0;s<count;s++)if(!indeg[s])queue.push(s);for(let i=0;i<queue.length;i++){const t=next[queue[i]];if(--indeg[t]===0)queue.push(t);}
 const basin=new Int32Array(count).fill(-1),depth=new Int32Array(count),cycles=[];
 for(let s=0;s<count;s++)if(indeg[s]&&basin[s]<0){const id=cycles.length,c=[];let t=s;do{basin[t]=id;c.push(t);t=next[t];}while(t!==s);cycles.push(c);}
 for(let i=queue.length-1;i>=0;i--){const s=queue[i];basin[s]=basin[next[s]];depth[s]=depth[next[s]]+1;}
 const sizes=new Int32Array(cycles.length);for(let s=0;s<count;s++)sizes[basin[s]]++;
 return{n,pairs,count,next,basin,depth,cycles,sizes,maxDepth:Math.max(...depth)};
}
if(typeof module!=='undefined')module.exports={analyze};else root.GraphEngine={analyze};
})(typeof self!=='undefined'?self:globalThis);
