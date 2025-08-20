import http from '@/utils/http';

// /repo/getAppBranch
// 分页获取应用仓库分支列表
export function getAppBranch(params) {
  return http({
    method: 'get',
    url: '/repo/getAppBranch',
    params,
  });
}

// /repo/getAppVersion
// 获取应用仓库分支提交记录
export function getAppVersion(params) {
  return http({
    method: 'get',
    url: '/repo/getAppVersion',
    params,
  });
}

// /repo/getFileTree
// 获取仓库文件结构
export function getFileTree(params) {
  return http({
    method: 'get',
    url: '/repo/getFileTree',
    params,
  });
}

// /repo/getFileContent
// 获取文件内容，需base64解密
export function getFileContent(params) {
  return http({
    method: 'get',
    url: '/repo/getFileContent',
    params,
  });
}

// /repo/downloadFile
// 下载仓库文件
export function downloadFile(params) {
  return http({
    method: 'get',
    url: '/repo/downloadFile',
    params,
    responseType: 'blob',
  });
} 