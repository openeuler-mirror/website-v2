---
title: 'Version Recommendation and Auto-update Features of openEuler-Advisor'
date: 2020-12-01
tags:
  - Version recommendation
  - Auto-update
archives: 2020-12
author: Leo Fang
summary: Version recommendation and auto-update features of openEuler-Advisor
---

## Contents

- Background
- Function
- Basic Components
- Basic Configuration and Installation
- Version Recommendation and Auto-update
---

## Background

The openEuler distribution integrates software from upstream communities. Each piece of software from being integrated to continuous maintenance requires a lot of work. In a distribution, the number of base software is in thousands. Considering the ecosystem, the number of base software is even in tens of thousands (refer to the fedora/ubuntu/openSUSE in the industry). Therefore, the total workload is heavy.

The community needs a collection of tools that can reduce the total workload, not only the workload of contributors and maintainers, but also the workload of verifiers. Therefore, openEuler-Advisor is developed. 

## Function

openEuler-Advisor provides a collection of automation tools for easy routine maintenance of openEuler, in terms of query, inspection, update, and prompt.


## Basic Components

The openEuler-Advisor core components are stored in the **advisors** directory, providing functions such as upstream software package information query, version recommendation, software repository inspection (file check, duplicate software package check, software source address check, and software regression check), automatic software repository creation, and automatic software package update, and automatic review of software repositories. The functions of each component are described as follows:

<div align='center'>

![](./advisors-compose.png)

</div>

- **simple_update_robot**: used for automatic update of software packages in src-openeuler. It can automatically fork the software repository, download the source package to be updated, modify the spec file (automatically match the patches merged in the upstream community), compile the local OBS, and automatically create PRs (including difference analysis reports) and issues.   

<div align='center'>

![](./auto-upgrade.png)

</div>

- **oa_upgradable**: used to query the upstream release information and version recommendation information of the software packages, obtain valid release tags of the software packages in the community, and recommend the latest version and maintenance version of the software packages using the version recommendation algorithm. If necessary, it can determine whether a software package needs to be updated and create related issues accordingly.

- **check_missing_file**: used to check missing files in each software repository in src-openeuler. If there is a missing file, an issue is automatically created to notify the maintainer.

- **check_repeated_repo**: used to check duplicate software repositories in src-openeuler. If two software repositories with the same upstream address but different names exist, the component notifies the maintainer.

- **check_source_url**: used to check the source address of each software package in src-openeuler. If a source package cannot be downloaded through the source address, an issue is automatically created in the corresponding software repository to notify the maintainer.

- **create_repo** and **create_repo_with_srpm**: used to create repositories in batches. **create_repo_with_srpm** can automatically obtain the name, summary, description, and upstream information from the RPM package.

- **psrtool**: used to query the SIG to which a software package belongs and the list of software packages managed by a SIG.

- **review_tool**: As an automatic code review tool, this component can generate the code review list of RPs in a specified software repository to standardize the PR review process, and automatically complete some check items, reducing the workload of commiters and ensuring the review quality.

- **tc_reminder**: used to automatically create prompt messages for TC members, such as the TC member list and PR status information, to facilitate automatic management of the entire community.

- **which_archived**: used to check the archiving status of software packages in the upstream community. If a software package is no longer maintained, it notifies the maintenance team to adjust the maintenance policy.

## Basic Configuration and Installation

- Install software dependencies.

```
pip3 install python-rpm-spec (ver>=0.10)
pip3 install PyYAML (ver>=5,3.1)
pip3 install requests (ver>=2.24.0)
yum install rpmdevtools (ver>=8.3)
pip3 install beautifulsoup4 (ver>=4.9.3)
```

- Configure JSON files.

    Create a JSON file.

    ```
    root/.gitee_presonal_token.json
    ```

    JSON file format: {"user":"gitee_user_name","access_token":"token_password"}

    Entry for setting the Gitee token password: https://gitee.com/profile/personal_access_tokens

- Configure the Gitee SSH.

    If Gitee SSH is not configured, see https://gitee.com/help/articles/4181.

- Configuring the OBS

    If OBS is not configured, see https://www.openeuler.org/en/.

- Configure the Python environment.

    To use this tool in the development state, configure the Python environment path: **source ./develop_env.sh**. 

## Version Recommendation and Auto-update 

This section describes how to query the software package versions and implement version recommendations, and how to use the automatic software package update function.

- **oa_upgradable**:

    **Query of the upstream community information and recommended version of a software package**: `python3 oa_upgradable.py pkg_name [-d default_yaml_path] [-p]`

    Description: **-d** indicates the default YAML address required for the query. The YAML file contains the basic upstream information of the software package. For details, visit the openEuler-Advisor official website. **-p** indicates that if the query result shows that the software package can be updated, an issue is automatically created in the software repository.

    Example: `python3 oa_upgradable.py glibc`

- **simple_update_robot**:

    **Manual update of a single software package**: `python3 simple_update_robot.py pkg_name branch_name [-fc] [-d] [-s] [-n new_version] [-b] [-p]`

    Description: **-fc** indicates to fork and clone a software repository to the local host. **-d** indicates to download the source package to be updated. **-s** indicates the spec to be modified for update. **-n** indicates the target version. **-b** indicates to perform local compilation. **-p** indicates to submit the PR for update and create the corresponding issue after the local verification is successful.

    Example: `python3 simple_update_robot.py snappy openEuler-20.03-LTS -fc -d -s -b -n 1.8.1`

    **Automatic update of a single software package**: `python3 simple_update_robot.py -u pkg pkg_name branch_name [-n new_version]`

    Description: **-u pkg** indicates the update of a single software package. **-n** indicates the target version. If this option is not specified, the system automatically chooses a proper version.

    Example: `python3 simple_update_robot.py -u pkg snappy master`

    **Automatic update of multiple software packages**: `python3 simple_update_robot.py -u repo repo_name branch_name`

    Description: **-u repo** indicates the update of multiple software packages. **repo_name** indicates the name of the collection or repository to be updated. By default, the YAML file with the same name is read from the local host. If the YAML file does not exist, the system reads it from the community.

    Example: `python3 simple_update_robot.py -u repo src-openeuler master`

You can configure the list of repositories to be updated in the local directory. The YAML file format is as follows:

Example: **upgrade-example.yaml**

```
repositories:
- name: A-Tune
- name: python-py
- name: python-ply
```

If you want to specify a target version for some software packages, configure it as follows:

```
repositories:
- name: A-Tune
  u_ver: x.y.z
- name: python-py
- name: python-ply
```

Then, use the tool to complete the update automatically.

```
python3 simple_update_robot.py -u repo upgrade-example master
```

