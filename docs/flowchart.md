# Flowchart for Procurement Process

```mermaid

graph TD
    st([Start]) --> add_request[请购员提交采购申请]
    add_request --> purchase_item[采购明细]
    purchase_item --> add_purchase_order[生成采购单]
    add_purchase_order --> create_PO[下订单并确认采购]
    create_PO --> supplier_confirm[供应商确认订单并发货]
    supplier_confirm --> receive_check{采购人员收到货品并检查}
    receive_check -->|是| good_category{是否为一般消耗品?}
    receive_check -->|否| good_exchange[联系供应商退换货] --> supplier_confirm
    good_category -->|是| buyer_gr[采购人员入库] --> process_end([Process End])
    good_category -->|否| user_gr[请购员入库] --> process_end([Process End])