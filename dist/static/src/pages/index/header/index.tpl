<div class="m-box p-header" :class="'p-header--'+step"><h2>{{items[step-1]}}</h2><div class="detail" v-if="step===1">请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===2">请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===3">润教育将在10个工作日内完成审核，如提交信息未通过审核，请及时修改并重新提交，逾期未提交审核状态将失效。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===4">双方签订联盟入驻协议，确认同意后下载签署页签字盖章，工作人员1-3个工作日上门收取。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===5">线上支付或转账所需服务费用，经财务确认即可完成缴纳。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a> <a class="btn--link" href="contract-detail.html" target="_blank">《润•教育才艺教学服务平台服务协议》</a></div><div class="detail" v-if="step===6">润教育为机构开通账号并提交网店相关资料。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a> <a class="btn--link" href="contract-detail.html" target="_blank">《润•教育才艺教学服务平台服务协议》</a> <span class="openSuccess">等待开通</span></div></div>