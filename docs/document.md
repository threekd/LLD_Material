# Low Level Design Document
> 文档结构:
>- 分组
>   - 表单
>       - 字段
>           - Tab
>       - 按钮
>       - 业务规则
>       - 工作流
>           - When adding new records
>       - 视图
>       - 权限设置

## Inventory

### 目录 | Index
> 此表单的作用在于规范命名，便于库存查询和统计分析。

#### 字段
##### Tab - Basic
- Title (auto):
    - [Chinese Name] | [English Name]
- Has CAS Number？
    - Yes
    - No
- CAS Number (Relationship): **CAS Number List**
- Chinese Name
- English Name
- 别名 | Synonyms: 此处可输入任意数量的中文或英文名称，仅用于方便查找，不会影响标准命名。建议用逗号分隔不同名称。

##### Tab - Material List
- 物料清单 | Material List (Relationship): **物料清单 | Material List**

#### 按钮
- Add Synonyms:
    - Action: 弹出窗口，可修改当前物料 **别名 | Synonyms**

#### 业务规则
- When Material Index is **00_无需目录收录的物品 | Do not need Index** 
    - Show **Material name**

#### 工作流
- None

#### 视图
- All

#### 权限设置

### 物料清单 | Material List
> 此表单定义了与物质本身性质相关的内容，不包括批次信息。

#### 字段
##### Tab - Basic
- Title (auto):
    - [规格 / 浓度 / 当量 /etc.] [Material Name], [包装 | Package] - [品牌 (生产商) | Brand]
- Material_ID
- Material Index (Relationship)
- 领用方式 | Use Type:
    - 单次领用 | Single Use
    - 用后归还 | Return After Use
    - 无需领用 | No Required
- - 默认存放位置 | Storage Area (Relationship): **Storage Area List**
- Material Type（多选）: 
    > 此处分类决定后续采购及领用流程。
    - 甲类危险品 | Class A
    - 管控物质 | Controlled
        - 领用时需通过危化品领用单，双人双签。
    - 标准品 | Reference Material
        - 常规领用单，入库后需验收。
    - Consumable - key
        - 常规领用单，需填写领用记录。
    - Consumable - Regular
        - 由采购人员定期盘点库存，无需领用。
        - 当库存不足时，任何人都可以点击 **盘点** 按钮以标注实际库存，从而触发安全库存预警，方便采购人员及时补货。也可以直接点击 **再次购买** 按钮，系统将自动生成采购申请单。
    - Others
        - 无需库存管理的物品。
- MSDS
- 包装 | Package
- 规格 / 浓度 / 当量 /etc.
> 规格是产品的具体描述，包装是产品的外部包装方式。如一包50ml离心管，其规格为“50ml”,包装为“25个/包”。如2L 37%盐酸溶液，其规格或浓度为“37%”，包装为“2L”或“2L/瓶”。同一个物品可以有不同包装，但规格不同一定是不同的物品。
- 品牌 (生产商) | Brand (Required)
- 货号 | Product Number
- 预估单价
- 采购单位 | Unit (Required)
- 领用单位 | Unit (Required)
- 库存换算系数
> 库存数量 = 库存换算系数 * 采购数量。如一瓶溶液包装为“500ml（/瓶）”，领用单位为“ml”，因采购单位为“瓶”，，则库存换算系数应设为“500”。此设计旨在确保领用时准确扣除库存。
##### Tab - Inventory Info.
- 安全库存
- 当前库存总量 (auto)
    - Rollup **当前库存总量**
    - Sum

- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**
##### Tab - Supplier
- Supplier: **供应商清单 | Supplier List (Relationship)**

#### 按钮
- None

#### 业务规则
- None

#### 工作流
- None

#### 视图
- All
- 库存不足
    - Filter:
        - **安全库存** is not empty
        - **当前库存总量** < **安全库存**

#### 权限设置

### 库存明细 | Inventory Details
> 此表单在 **物料清单 | Material List** 的基础上增加了批次信息及其验收记录。
#### 字段
##### Tab-Basic
- 物料清单 | Material List (Relationship): **物料清单 | Material List**
- Material Status (auto):
    - 可用的 | Available
    - 待归还 | Pending Return
    - 已过期 | Expired
    - 已停用 | Disabled
- 领用方式 | Use Type：默认来自上一级 **物料清单 | Material List**
- 批号 | Batch Number
- Project Related
    - RMP/PTP
    - Other
- 入库日期 | Receive Date
- 有效期至 | Expired Date
- 纯度等级 | Purity Grade
- 纯度 | Purity: 
    - range: [0-1]
- COA
- MSDS: 来自上一级 **物料清单 | Material List**
- 当前库存数量
    - Rollup **变动数量 | Number - Changed**
    - Sum
- 领用单位 | Unit
- 库区库位 | Storage Area: **Storage Area List**
- 备注 | Remarks
- 货号 | Product Number
- 预估单价
- 供应商 | Supplier (Relationship): **供应商清单 | Supplier List**

##### Tab - Stock Change Info.
库存变动明细 | Stock Change Record (Relationship) : **库存变动明细 | Stock Change Record**

##### Tab - FM-03I 耗品验收/服务评估记录
- Product ( or Service) Quality | 产品(或服务) 质量
- On-time Delivery | 物流速度
- 评估结果 | ResultL:
    - Pass
    - Pending Evaluation
    - Reject
- 技术评估 | Evaluation
- 评价/追评 | Comments
- Attachment

#### 按钮
- 领用
    - Action:
        - 弹出 **领用单 (General)**，触发 **新增领用单 (General)** 工作流，参见Change Log - 领用单 (General) - 工作流
        - 若领用方式为 **用后归还 | Return After Use**，则更新 Status 为 **待归还 | Pending Return**
    - Conditional:
        - Material Status **equals** 可用的 | Available
        - Material Type **is none of** 管控物质 | Controlled
        - 领用方式 | Use Type **not equal to** 无需领用 | No Required
- 盘点
    - Action:
        - 弹出 **盘点单**，触发 **新增盘点单** 工作流，参见Change Log - 盘点单 - 工作流
    - Conditional:
        - Material Status **not any of** 已停用 | Disabled
- 危化品领用
    - Action:
        - 弹出 **领用单 (Controlled)**，触发 **新增危化品领用申请** 工作流，参见Change Log - 领用单 (Controlled) - 工作流
    - Conditianal:
        - Material Type **is any of** 管控物质 | Controlled
        - Material Status **not any of** 已停用 | Disabled, 已过期 | Expired，已用完 | Run Out
- 再次购买
    - Action:
        - 弹出窗口，填写采购数量，Workflow会通过正则表达式确认输出为数字型。
        - 以当前库存为模板，生成一条采购申请及其关联的采购明细。
- 评价/验收:
    - Action:
        - 弹出Tab - Rating & Evaluation，添加评价和评估信息后，Workflow将同步同一入库单下的同批号库存评价内容。
- 停用
    - Action:
        - 将 Material Status 更新为 **已停用 | Disabled**
    - Conditional:
        - Material Status **not equal to** 已停用 | Disabled
- 归还
    - Action:
        - 弹出 **归还单**
        - 若 Material Status 为 **待归还 | Pending Return**，则更新状态为**可用的 | Available**
        - 触发 **新增归还单** 工作流，参见 Change Log - 归还单 - 工作流

#### 业务规则
- When Material Status **Is one of** 已停用 | Disabled，已过期 | Expired
    - Read-only all fields

#### 工作流
- None

#### 视图
- All
- 已过期

#### 权限设置

## Purchase:
### 采购申请 | Purchase Request

#### 字段

- Status of Request (auto)：
    - Submitted: 已下单条目=0
    - Purchasing 已下单条目>0,已完成条目<条目总数
    - Compeleted: 非以上条件

- 采购用途 | Justification（required）
- PurchaseRequest_ID (auto)
- Requestor (auto): 当前用户
- Purchase Request Date (auto): 当前时间
- 备注 | Remark: 用户可以通过此字段备注需要采购人员了解的事项。
- 预估请购总价 | Estimated Total (auto)
- 已下单条目 (auto):
    - Rollup: Number of Records
    - Filter: Status of Goods **not any of** Initial,Cancel
- 已完成条目 (auto):
    - Rollup: Number of Records
    - Filter: Status of Goods **Is one of** Received,Cancel
- 请购项目数 (auto):
    - 所关联条目总数
- Purchase Item (Relationship): **采购明细 | Purchase Item**

#### 按钮
- Cancel
    - Action:
        - 将该申请单下的采购条目状态更新为 **Cancel**
    - Conditional: 已下单条目=0

#### 业务规则
- When Status of Request **not equal to** Submitted
    - Read-only all fields

#### 工作流

#### 视图
- All

#### 权限设置
- APTC Members:
    - View (All)
    - Edit (Owner)

### 采购明细 | Purchase Item

#### 字段

##### Tab - Basic:
- Material (Relationship): **物料清单 | Material List**
- Status of Goods (auto):
    - Initial: 提交后初始状态
    - Purchasing: 采购人员提交采购单 **Create PO确认购买** 后
    - Reveived: 采购人员收到货 **签收** 后
    - Stocked: 货物执行 **入库** 后
    - Cancel

- Project Related:
    - RMP/PTP: 勾选后所购买项目会被标记为RMP/PTP专用，也会方便后续统计此项目花费
    - Other: 其他项目也可添加选项或使用other
- Purchase Request (Relationship): **采购申请 | Purchase Request**
- Requisitioner | 请购员 (auto): 当前用户
- Purchase Order (Relationship): **采购单 | Purchase Order**
- 购买数量 | Number
- 采购单位 | Unit
- 供应商 | Supplier (Relationship): **供应商清单 | Supplier List**
- 货号 | Product Number
- 单价 | Price
- 总价 | Total Price (auto)
- MSDS
- 报价单 | Quotation
- 备注 | Remark
- 纯度等级 | Purity Grade
- 纯度 | Purity

##### Tab - Stock Records:
- 入库单 (Relationship): **入库单**
- 入库数量: 此单下入库的数量，单位为采购单位。
- 入库明细 (Relationship): **库存明细 | Inventory Details**

##### Tab - Receipt Info.: 
由采购人员签收时填写
- Status of Package:
    - Good
    - Broken
    - Partial Received
- Receipt Information

#### 按钮
Single Data Source:
- 入库: 
    - Action: 弹出**入库单**，触发 **新建入库单** workflow。(参见Changelog-入库单-工作流)
    - Conditional: Status of Goods **Is one of** Received

- 签收:
    - Action:
        - 弹出窗口，填写 **Status of Package**, **Receipt Information**
        - 若 Status of Package 为 **Good**, 更新 Status of Goods 为 **Received**
            - 若入库数 = 采购，则更新采购单状态为 **GR**
            - 若入库数 < 采购，则更新采购单状态为 **Partial GR**
    - Conditional: Status of Goods **Is one of** Purchasing

Batch Data Source:
- 生成采购单:
    - Action: 合并采购项目生成一条 **采购单 | Purchase Order**
    - Conditional: Status of Goods **is** Initial

#### 业务规则

#### 工作流

#### 视图

#### 权限设置

### 采购单 | Purchase Order

#### 字段
- PurchaseOrder_ID
- Status of Order (auto):
    - Initial: 提交后初始状态
    - Purchasing: 点击 **Create PO确认采购** 后
    - Partial GR:
    - GR
    - Cancel: 取消该订单。
- PO Number
- 实际总花费 | Total: 采购人员填写该订单实际花费。
- 备注 | Remark
- 汇总金额 (auto): 汇总所列项目金额，原则上应与实际总花费一致。
- 入库明细数
- 采购明细数
- Purchase Item (Relationship): **采购明细 | Purchase Item**

#### 按钮
Single Data Source:
- Create PO确认采购:
    - Action: 
        - 弹出窗口，采购人员填写 PO Number， 实际总花费 | Total
        - 更新采购单及其采购明细的状态为Purchasing
        - 以此次采购信息更新所关联的物料清单中的 **Purchase Info.**
    - Conditional: Status of Order **Is one of** Initial

- 取消采购:
    - Action: 将此采购单状态更改为Cancel
    - Conditional: Status of Order **Is one of** Initial

#### 业务规则

- When Status of Order **is** Cancel
    - Read-only all fields

#### 工作流

#### 视图

#### 权限设置

## Change Log

### 库存变动明细 | Stock Change Record

#### 字段
- Operator
- Operate Date
- Operation
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**
- 变动前库存 | Number - Before
- 变动后库存 | Number - After
- 变动数量 | Number - Changed
- 库存单位 | Unit


#### 按钮

#### 业务规则

#### 工作流

#### 视图

#### 权限设置


### 入库单

#### 字段
- 入库方式 | Stocking Method
- 采购明细 | Purchase Item (Relationship): **采购明细 | Purchase Item**
- Operator (auto)
- Operate Date (auto)
- 物料清单 | Material List (Relationship): **物料清单 | Material List**
- 入库数量 | Number
    - Limit numerical range: [0,Max]
    - 采购单位 | Unit
- 批号 | Batch Number
- 有效期至 | Expired Date
- COA
- MSDS
- Storage Area List (Relationship): **Storage Area List**
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**

#### 按钮

#### 业务规则

#### 工作流

##### When adding new records:
- 当MSDS不为空，更新物料清单中的MSDS
>（可能会出问题，若有人上传错误文件，则该条目下物料则使用错误文件）
- 若入库方式为合并入库:
    - 当Material Type **is any of** 甲类，管控，标准品，Consumable-key:
        - 新建一条库存记录，call PBP - **出入库记录**
    - 当Material Type **is none of** 甲类，管控，标准品,Consumable-key:
        - 若不存在该物料:
            - 新建一条库存记录，call PBP - **出入库记录**
        - 若已存在该物料:
            - 更新该物料批号，入库日期，库区库位，call PBP - **出入库记录**
- 若入库方式为拆分入库:
    - 根据入库数量，创建n个相同的库存记录。call PBP - **出入库记录**

- 更新 Status of Goods 为 **Stocked**

#### 视图

#### 权限设置


### 盘点单

#### 字段
- Operator
- Operate Date
- 实际库存 | Number
    - Limit numerical range: [0,Max]
- 领用单位 | Unit
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**

#### 按钮

#### 业务规则

#### 工作流

##### When adding new records:
- 更新相关库存记录，call PBP - **出入库记录**

#### 视图

#### 权限设置

### 领用单（General）

#### 字段
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**
- 领用量 | Number
    - Limit numerical range: [0,Max]
- 领用单位 | Unit
- 领用人 | User
- 领用日期 | Usage Date

#### 按钮
- None
#### 业务规则
- When **领用方式 | Use Type** is **单次领用 | Single Use**
    - Show **领用量 | Number**
    - Required **领用量 | Number**

#### 工作流

##### When adding new records:
- 更新相关库存记录，call PBP - **出入库记录**
- 当领用方式为单次领用时:
    - 扣减库存为领用量，标记operation为**单次领用**
- 当领用方式为用后归还时，
    - 扣减库存为0，标记operation为**领用待归还**

#### 视图

#### 权限设置

### 领用单 (Controlled)

#### 字段
- Title (auto)
    - **库存明细 | Inventory Details**, **申请人**
- 申请日期
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**
- 使用目的
- 用前称重
- 用后称重
- 实际使用量 (auto):
    - 用后称重 - 用前称重
- 申请人
- 审批人
- 申请人签字
- 审批人签字

#### 业务规则

#### 工作流

##### When adding new records:
- Action:
    - 若Index包含 **Caffeine**
        - 通知咖啡因审批人进行审批，审批人在审批通过时需签名确认。
    - 其他情况
        - 通知危险化学品审批人进行审批，审批人在审批通过时需签名确认。

#### 视图

#### 权限设置

### 归还单

#### 字段
- 库存明细 | Inventory Details (Relationship): **库存明细 | Inventory Details**
- 领用量 | Number
    - Limit numerical range: [0,Max]
- 库存单位 | Unit
- 归还员 | Returner
- 归还日期 | Return Date

#### 按钮

#### 业务规则

#### 工作流

##### When adding new records:
- 更新相关库存记录，call PBP - **出入库记录**

#### 视图

#### 权限设置

## Self-Made

### Self-made - PhyChem

#### 字段
- Title
- 名称 | Name
- 溶剂 | Solvent
- 批号 | Batch Number: 默认当前日期，格式为YYYYMMDD
    > Function:CONCAT(YEAR(DATENOW()),IF(MONTH(DATENOW())<10,"0",""),MONTH(DATENOW()),IF(DAY(DATENOW())<10,"0",""),DAY(DATENOW()))
- 包装 | Package
- 分装个数 | Number
- 领用单位 | Unit
- Shelf-life (day)
- Preparation Date (auto)
- Expiration Date (Fx):
    - [Expiration Date] = [Preparation Date] + [Shelf-life (day)] 
- Calculation formula
- 浓度 | Concentration
- Attachment
- HazardClass
    - General
    - Corrosive
    - Flammable
    - Toxic
- 备注 | Remark
- Prepared by
- Reviewer
- Signature (P)
- Signature (R)
- Preparations - PhyChem (Relationship): **Preparations - PhyChem**
- Equipment (Relationship): **Equipment**

#### 按钮
- Disable: 将状态更新为已停用，只读所有字段。
- Print
- Reproduce:
    - Action:
        - 复制当前Record及其子表
        - 清空字段:
#### 业务规则

#### 工作流

#### 视图
- All
#### 权限设置

### Preparation - PhyChem

#### 字段
- Title:
    - [Reagent] - [批号 | Batch Number]
- Add Reagent by Using Record
    - Filter:
        - Operator **is** Owner (Current Record)
        - Operate Date **equals** This Week
- Reagent (Relationship): **库存明细 | Inventory Details**
- Self-Made
- 数量 | Amount
- 单位 | Unit (auto)
- 批号 | Batch Number (auto)

#### 按钮
- None

#### 业务规则
- When Material **is empty**:
    - Show Self-Made
    - Required Self-Made
- When Self-Made **is empty**
    - Show Add Material by Using Record, Material
    - Required Material
- When Material i**s not empty** or Self-Made **is not empty**
    - Hide Or

#### 工作流
- None

#### 视图
- All

#### 权限设置
 - Hide from Bar

### Self-Made - Micro

#### 字段
- Title:
    - [Name | 名称] - [批号 | Batch Number], [Package | 包装]
- Status of Self-Made:
    - 可用的
    - 已过期
    - 已停用
- Name | 名称
- 批号 | Batch Number: 默认当前日期，格式为YYYYMMDD
    > Function:CONCAT(YEAR(DATENOW()),IF(MONTH(DATENOW())<10,"0",""),MONTH(DATENOW()),IF(DAY(DATENOW())<10,"0",""),DAY(DATENOW()))
- 数量 | Quantity
- Package | 包装
- Shelf-life (day)
- Preparation Date
- Expiration Date (Fx):
    - [Expiration Date] = [Preparation Date] + [Shelf-life (day)]
- 灭菌后pH
- 灭菌条件
- 无菌培养:
    - 合格
    - 不合格
- Storage Area List (Relationship): **Storage Area List**
- HazardClass
    - General
    - Corrosive
    - Flammable
    - Toxic
- Prepared by (auto): 新建时当前用户
- Signature
- Remark
- Preparation - Micro (Relationship): **Preparation - Micro**
- Equipment (Relationship): **Equipment**

#### 按钮
- Disable: 将状态更新为已停用，只读所有字段。
- Print
- Reproduce:
    - Action:
        - 复制当前Record及其子表
        - 清空字段: **数量 | Quantity**，**灭菌后pH**，**Signature**，Preparations - **数量 | Amount**

#### 业务规则
- When Status of Self-Made **Is one of** 已停用，已过期:
    - Read-only all fields

#### 工作流
- None

#### 视图
- All
- My

#### 权限设置

### Preparation - Micro

#### 字段
- Title:
    - [Reagent] - [批号 | Batch Number]
- Add Reagent by Using Record
    - Filter:
        - Operator **is** Owner (Current Record)
        - Operate Date **equals** This Week
- Reagent (Relationship): **库存明细 | Inventory Details**
    - Filter: Material Status **Is one of** 可用的 | Available，待归还 | Pending Return
- Self-Made - Micro (Relationship): **Self-Made - Micro**
- 数量 | Amount
- 领用单位 | Unit (auto)
- 批号 | Batch Number (auto)

#### 按钮
- None

#### 业务规则
- None

#### 工作流
- None

#### 视图
- All

#### 权限设置
 - Hide from Bar