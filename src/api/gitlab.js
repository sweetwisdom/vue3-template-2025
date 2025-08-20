import http from '@/utils/http';

// /gitlab/projects/{id}/repository/tree
// 获取仓库文件树结构
export function getRepositoryTree(projectId, params) {
  return http({
    method: 'get',
    url: `/gitlab/projects/${projectId}/repository/tree`,
    params,
  });
}

// /gitlab/projects/{id}/repository/branches
// 获取仓库分支列表
export function getRepositoryBranches(projectId) {
  return http({
    method: 'get',
    url: `/gitlab/projects/${projectId}/repository/branches`,
  });
}

// /gitlab/projects/{id}/repository/files/{file_path}/raw
// 获取文件内容
export function getFileContent(projectId, filePath, params) {
  return http({
    method: 'get',
    url: `/gitlab/projects/${projectId}/repository/files/${encodeURIComponent(filePath)}/raw`,
    params,
  });
}

// /gitlab/projects/{id}/repository/commits
// 获取提交历史
export function getRepositoryCommits(projectId, params) {
  return http({
    method: 'get',
    url: `/gitlab/projects/${projectId}/repository/commits`,
    params,
  });
} 