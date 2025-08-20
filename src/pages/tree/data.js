export const demoData = {
  id: '1',
  fileType: 'FOLD',
  name: 'Characteristic',
  path: '',
  children: [
    {
      id: '2',
      name: '.mworks',
      message: 'init repo',
      path: '.mworks',
      size: '43',
      time: '1754532720000',
      fileType: 'FOLD',
      children: [
        {
          id: '3',
          name: 'dependency.json',
          message: 'init repo',
          path: '.mworks/dependency.json',
          size: '55',
          time: '1754532720000',
          fileType: 'FILE',
          leaf: true,
        },
      ],
    },
    {
      id: '4',
      name: 'Model10',
      message: '1',
      path: 'Model10',
      size: '134',
      time: '1754532762000',
      fileType: 'FOLD',
      children: [
        {
          id: '5',
          name: 'CharacteristicThyristors.mo',
          message: '1',
          path: 'Model10/CharacteristicThyristors.mo',
          size: '6052',
          time: '1754532762000',
          fileType: 'FILE',
          leaf: true,
        },
        {
          id: '6',
          name: 'package.mo',
          message: '1',
          path: 'Model10/package.mo',
          size: '44',
          time: '1754532762000',
          fileType: 'FILE',
          leaf: true,
        },
        {
          id: '7',
          name: 'package.order',
          message: '1',
          path: 'Model10/package.order',
          size: '25',
          time: '1754532762000',
          fileType: 'FILE',
          leaf: true,
        },
      ],
    },
    {
      id: '1-1',
      name: 'README.md',
      message: '1',
      path: 'Model10/README.md',
      size: '44',
      time: '1754532762000',
      fileType: 'FILE',
      leaf: true,
    },
  ],
}

// 模拟获取文件内容接口

export function getFileContent(path) {
  const fileType = path.split('.').pop()

  const fileCOntents = {
    json: '﻿{\n' + '  "modelicaVersion": "",\n' + '  "dependencies": []\n' + '}',
    mo:
      '﻿within Model2;\n' +
      'model FreeBody "Free flying body attached by two springs to environment"\n' +
      '  extends Modelica.Icons.Example;\n' +
      '  parameter Boolean animation = true "= true, if animation shall be enabled";\n' +
      '  inner Modelica.Mechanics.MultiBody.World world annotation (Placement(\n' +
      '    transformation(extent = {{-60, 20}, {-40, 40}})));\n' +
      '  Modelica.Mechanics.MultiBody.Parts.FixedTranslation bar2(r = {0.8, 0, 0}, animation = false)\n' +
      '    annotation (Placement(transformation(extent = {{0, 20}, {20, 40}})));\n' +
      '  Modelica.Mechanics.MultiBody.Forces.Spring spring1(\n' +
      '    width = 0.1, \n' +
      '    coilWidth = 0.005, \n' +
      '    numberOfWindings = 5, \n' +
      '    c = 20, \n' +
      '    s_unstretched = 0) annotation (Placement(transformation(\n' +
      '      origin = {-20, 0}, \n' +
      '      extent = {{-10, -10}, {10, 10}}, \n' +
      '      rotation = 270)));\n' +
      '  Modelica.Mechanics.MultiBody.Parts.BodyShape body(\n' +
      '    m = 1, \n' +
      '    I_11 = 1, \n' +
      '    I_22 = 1, \n' +
      '    I_33 = 1, \n' +
      '    r = {0.4, 0, 0}, \n' +
      '    r_CM = {0.2, 0, 0}, \n' +
      '    width = 0.05, \n' +
      '    r_0(start = {0.2, -0.5, 0.1}, each fixed = true), \n' +
      '    v_0(each fixed = true), \n' +
      '    angles_fixed = true, \n' +
      '    w_0_fixed = true, \n' +
      '    angles_start = {0.174532925199433, 0.174532925199433, 0.174532925199433})\n' +
      '    annotation (Placement(transformation(extent = {{0, -40}, {20, -20}})));\n' +
      '  Modelica.Mechanics.MultiBody.Forces.Spring spring2(\n' +
      '    c = 20, \n' +
      '    s_unstretched = 0, \n' +
      '    width = 0.1, \n' +
      '    coilWidth = 0.005, \n' +
      '    numberOfWindings = 5) annotation (Placement(transformation(\n' +
      '      origin = {40, 0}, \n' +
      '      extent = {{-10, -10}, {10, 10}}, \n' +
      '      rotation = 270)));\n' +
      'equation \n' +
      '  connect(bar2.frame_a, world.frame_b)\n' +
      '    annotation (Line(\n' +
      '      points = {{0, 30}, {-40, 30}}, \n' +
      '      color = {95, 95, 95}, \n' +
      '      thickness = 0.5));\n' +
      '  connect(spring1.frame_b, body.frame_a) annotation (Line(\n' +
      '    points = {{-20, -10}, {-20, -30}, {0, -30}}, \n' +
      '    color = {95, 95, 95}, \n' +
      '    thickness = 0.5));\n' +
      '  connect(bar2.frame_b, spring2.frame_a)\n' +
      '    annotation (Line(\n' +
      '      points = {{20, 30}, {40, 30}, {40, 10}}, \n' +
      '      color = {95, 95, 95}, \n' +
      '      thickness = 0.5));\n' +
      '  connect(spring1.frame_a, world.frame_b) annotation (Line(\n' +
      '    points = {{-20, 10}, {-20, 30}, {-40, 30}}, \n' +
      '    color = {95, 95, 95}, \n' +
      '    thickness = 0.5));\n' +
      '  connect(body.frame_b, spring2.frame_b) annotation (Line(\n' +
      '    points = {{20, -30}, {40, -30}, {40, -10}}, \n' +
      '    color = {95, 95, 95}, \n' +
      '    thickness = 0.5));\n' +
      '  annotation (\n' +
      '    experiment(StopTime = 10), \n' +
      '    Documentation(info = "<html>\n' +
      '<p>\n' +
      'This example demonstrates:\n' +
      '</p>\n' +
      '<ul>\n' +
      '<li>The animation of spring and damper components</li>\n' +
      '<li>A body can be freely moving without any connection to a joint.\n' +
      '    In this case body coordinates are used automatically as\n' +
      '    states (whenever joints are present, it is first tried to\n' +
      '    use the generalized coordinates of the joints as states).</li>\n' +
      '<li>If a body is freely moving, the initial position and velocity of the body\n' +
      '    can be defined with the \\"Initialization\\" menu as shown with the\n' +
      '    body \\"body1\\" in the left part (click on \\"Initialization\\").</li>\n' +
      '</ul>\n' +
      '\n' +
      '<img src=\\"modelica://Modelica/Resources/Images/Mechanics/MultiBody/Examples/Elementary/FreeBody.png\\"\n' +
      'alt=\\"model Examples.Elementary.FreeBody\\">\n' +
      '</html>"));\n' +
      'end FreeBody;',
    order: 'CharacteristicThyristors\n',
    py:
      '# 将图片安装日期顺序排列\n' +
      '\n' +
      'import os\n' +
      'import time\n' +
      'def reNameByTime(path):\n' +
      '    fileList = os.listdir(path)\n' +
      '    fileList.sort(key=lambda x: os.path.getmtime(os.path.join(path, x)))\n' +
      '    for i in range(len(fileList)):\n' +
      "        os.rename(os.path.join(path, fileList[i]), os.path.join(path, str(i) + '.jpg'))\n" +
      '\n' +
      '\n' +
      "# reNameByTime('./pic')\n" +
      '\n' +
      '#  获取当前位置的天气情况\n' +
      'def getWeather(city):\n' +
      "    url = 'http://wthrcdn.etouch.cn/weather_mini?city=' + city\n" +
      '    import requests\n' +
      '    r = requests.get(url)\n' +
      '    data = r.text\n' +
      '    import json\n' +
      '    data = json.loads(data)\n' +
      '    # print(data)\n' +
      '    # data = json.loads(data)\n' +
      '    # print(data)\n' +
      "    return data['data']['forecast'][0]['type']\n" +
      '\n' +
      "# print(getWeather('武汉'))\n" +
      '\n' +
      '# 根据本机ip获取当前位置\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n',
    md:
      '# Server1\n' +
      '\n' +
      '\n' +
      '\n' +
      '## Getting started\n' +
      '\n' +
      "To make it easy for you to get started with GitLab, here's a list of recommended next steps.\n" +
      '\n' +
      'Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!\n' +
      '\n' +
      '## Add your files\n' +
      '\n' +
      '- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files\n' +
      '- [ ] [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:\n' +
      '\n' +
      '```\n' +
      'cd existing_repo\n' +
      'git remote add origin https://qysys.tongyuan.cc/ty/server1.git\n' +
      'git branch -M main\n' +
      'git push -uf origin main\n' +
      '```\n' +
      '\n' +
      '## Integrate with your tools\n' +
      '\n' +
      '- [ ] [Set up project integrations](https://qysys.tongyuan.cc/ty/server1/-/settings/integrations)\n' +
      '\n' +
      '## Collaborate with your team\n' +
      '\n' +
      '- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)\n' +
      '- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)\n' +
      '- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)\n' +
      '- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)\n' +
      '- [ ] [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)\n' +
      '\n' +
      '## Test and Deploy\n' +
      '\n' +
      'Use the built-in continuous integration in GitLab.\n' +
      '\n' +
      '- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)\n' +
      '- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)\n' +
      '- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)\n' +
      '- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)\n' +
      '- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)\n' +
      '\n' +
      '***\n' +
      '\n' +
      '# Editing this README\n' +
      '\n' +
      "When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.\n" +
      '\n' +
      '## Suggestions for a good README\n' +
      '\n' +
      'Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.\n' +
      '\n' +
      '## Name\n' +
      'Choose a self-explaining name for your project.\n' +
      '\n' +
      '## Description\n' +
      'Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.\n' +
      '\n' +
      '## Badges\n' +
      'On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.\n' +
      '\n' +
      '## Visuals\n' +
      "Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.\n" +
      '\n' +
      '## Installation\n' +
      'Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.\n' +
      '\n' +
      '## Usage\n' +
      "Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.\n" +
      '\n' +
      '## Support\n' +
      'Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.\n' +
      '\n' +
      '## Roadmap\n' +
      'If you have ideas for releases in the future, it is a good idea to list them in the README.\n' +
      '\n' +
      '## Contributing\n' +
      'State if you are open to contributions and what your requirements are for accepting them.\n' +
      '\n' +
      "For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.\n" +
      '\n' +
      'You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.\n' +
      '\n' +
      '## Authors and acknowledgment\n' +
      'Show your appreciation to those who have contributed to the project.\n' +
      '\n' +
      '## License\n' +
      'For open source projects, say how it is licensed.\n' +
      '\n' +
      '## Project status\n' +
      'If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.\n',
  }
  return fileCOntents[fileType] || fileCOntents['md']
}
