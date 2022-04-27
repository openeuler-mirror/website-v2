/**
 * @file  OSV认证相关接口
 * */

 import appAjax from '../libs/ajax-utils';
 const cveApi = '-approve';

 export const osvList = ({
   keyword,
   osvName,
   type,
   page,
   pageSize,
}) => {
   return new Promise((resolve, reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: '/cve-security-notice-server/osv/findAll',
           type: 'post',
           data: {
               keyword,
               osvName: osvName === 'all' ? '' : osvName,
               type: type === 'all' ? '' : type,
               pages: {
                   page,
                   size: pageSize
               },
           },
           success(result) {
               let res = {
                   totalRecords: result.result.totalCount,
                   list: result.result.hardwareCompList
               }
               if (result) {
                   resolve(res);
                   return;
               }
               reject(result);
           },
           error(msg) {
               reject(msg);
           }

       });

   });
}

//获取OS厂商选项
export const getOsName = () => {
   return new Promise((resolve,reject) => {
       appAjax.postJson({
           url: '/cve-security-notice-server/osv/getOsName',
           type: 'get',
           success(result) {
               if(result) {
                   resolve(result);
                   return;
               }
               reject(result);
           },
           error(msg) {
               reject(msg);
           }
       })
   });
};

//获取分类选项
export const getType = () => {
   return new Promise((resolve,reject) => {
       appAjax.postJson({
           url: '/cve-security-notice-server/osv/getType',
           type: 'get',
           success(result) {
               if(result) {
                   resolve(result);
                   return;
               }
               reject(result);
           },
           error(msg) {
               reject(msg);
           }
       })
   });
};

 //点击查看报告
 export const getApproveReport = ({
   id
}) => {
   return new Promise((resolve, reject) => {
       appAjax.postJson({
           otherBaseUrl: cveApi,
           url: 'cve-security-notice-server/osv/getOne',
           type: 'get',
           params: {
               id: id
           },
           success(result) {
               if (result) {
                   resolve(result.result);
                   return;
               }
               reject(result);
           },
           error(msg) {
               reject(msg);
           }

       });

   });
};

export const osvData = [
	{
		"os_version":"FusionOS-22_22.0.1_x86-64",
		"osv_name": "超聚变数字技术有限公司",
		"total_result": "pass",
		"type": "服务器",
		"date": "2022/4/22",
		"arch": "x86_64",
		"details": "详细信息",
		"friendly_link": "https://www.xfusion.com/cn/",
		"os_download_link": "https://www.xfusion.com/cn/",
		"checksum": "42cc85780e5a3e53cb9c33eb8e69e827",
		"base_openeuler_version": "openEuler 20.03 LTS SP3",
		"tools_result": [
			{
				"name": "core_pkg",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "soft_pkg",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "KABI",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "ABI",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "service_config",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "soft_config",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "kernel_config",
				"percent": "NA",
				"result": "pass"
			}		
		],
		"platform_result":[
			{
				"name": "repo",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "base_test",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "performance_test",
				"percent": "NA",
				"result": "pass"
			},
			{
				"name": "running_config",
				"percent": "NA",
				"result": "pass"
			}		
		]
	}
]