module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: false, // {property: 'status', select: {equals: '已发布'}}
      catalog: false,
      sorts: false,
      imgToBase64: false,
      limit: 10,
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs/notion',
      filename: 'title',
      catalog: false,
      format: 'markdown',
    },
  },
  image: {
    enable: true,
    platform: 'local',
    local: {
      outputDir: './docs/notion/images',
      prefixKey: '/notion/images',
      pathFollowDoc: false,
    },
    oss: {
      secretId: process.env.OSS_SECRET_ID,
      secretKey: process.env.OSS_SECRET_KEY,
      bucket: process.env.OSS_BUCKET,
      region: process.env.OSS_REGION,
      host: process.env.OSS_HOST,
      prefixKey: '',
    },
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_BUCKET,
      region: process.env.COS_REGION,
      host: process.env.COS_HOST,
      prefixKey: '',
    },
    qiniu: {
      secretId: process.env.QINIU_SECRET_ID,
      secretKey: process.env.QINIU_SECRET_KEY,
      bucket: process.env.QINIU_BUCKET,
      region: process.env.QINIU_REGION,
      host: process.env.QINIU_HOST,
      prefixKey: '',
    },
    upyun: {
      user: process.env.UPYUN_USER,
      password: process.env.UPYUN_PASSWORD,
      bucket: process.env.UPYUN_BUCKET,
      host: process.env.UPYUN_HOST,
      prefixKey: '',
    },
    github: {
      token: process.env.GITHUB_TOKEN,
      user: process.env.ELOG_GITHUB_USER,
      repo: process.env.ELOG_GITHUB_REPO,
      prefixKey: '',
    }
  }
}
