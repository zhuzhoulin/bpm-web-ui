export const defaultDiagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<definitions
    xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:flowable="http://flowable.org/bpmn"
    xmlns:ns0="undefined" targetNamespace="http://www.flowable.org/processdef">
    <process id="Process_1" name="Process_name_1" isExecutable="true">
        <documentation>Process_name_1</documentation>
        <startEvent id="StartEvent_1" name="开始节点" />
        <userTask id="UserTask_Id" name="发起人" >
            <extensionElements>
                 <flowable:customProperties userIdList="" userNameList="" assigneeField="" handlerStrategy="skip" roleGroupCode="" roleCode="" findUserType="5" relationNodeId="" actionList="start,draft" taskType="start" sequential="parallel" proportion="100" formName="" selectFormKey="" selectPath="0" />
            </extensionElements>
        </userTask>
        <sequenceFlow id="SequenceFlow_Id" sourceRef="StartEvent_1" targetRef="UserTask_Id">
        </sequenceFlow>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_Process_1">
        <bpmndi:BPMNPlane id="BPMNPlane_Process_1" bpmnElement="Process_1">
            <bpmndi:BPMNShape id="BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
                <omgdc:Bounds x="150" y="200" width="36" height="36" />
                <bpmndi:BPMNLabel>
                    <omgdc:Bounds x="146" y="243" width="43" height="14" />
                </bpmndi:BPMNLabel>
            </bpmndi:BPMNShape>
            <bpmndi:BPMNEdge id="BPMNEdge_SequenceFlow_Id" bpmnElement="SequenceFlow_Id">
                <omgdi:waypoint x="186" y="218" />
                <omgdi:waypoint x="260" y="218" />
            </bpmndi:BPMNEdge>
            <bpmndi:BPMNShape id="BPMNShape_UserTask_Id" bpmnElement="UserTask_Id">
                <omgdc:Bounds x="260" y="178" width="100" height="80" />
            </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
</definitions>`
