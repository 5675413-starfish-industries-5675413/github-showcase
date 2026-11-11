// Read-only, public REST API demonstration. Never emits credentials.
const repository=process.argv[2]||'5675413-starfish-industries-5675413/github-showcase';
if(!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository))throw new Error('Expected owner/repository');
const response=await fetch(`https://api.github.com/repos/${repository}`,{headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(10000)});
if(!response.ok)throw new Error(`GitHub API returned ${response.status}`);
const data=await response.json();
console.log(JSON.stringify({repository:data.full_name,url:data.html_url,default_branch:data.default_branch,visibility:data.visibility},null,2));
