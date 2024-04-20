// FirewallRuleGenerator.jsx
import React, { useState, useEffect } from "react";
import "../styles/FirewallRuleGenerator.css";

function FirewallRuleGenerator() {
  // States
  const [chain, setChain] = useState("");
  const [protocol, setProtocol] = useState("");
  const [action, setAction] = useState("");
  const [srcIpAddress, setSrcIpAddress] = useState("");
  const [srcPort, setSrcPort] = useState("");
  const [dstIpAddress, setDstIpAddress] = useState("");
  const [dstPort, setDstPort] = useState("");
  const [ruleOrder, setRuleOrder] = useState("");
  const [generatedRule, setGeneratedRule] = useState("");

  // Function to generate the firewall rule
  const generateRule = (
    chain,
    protocol,
    action,
    srcIpAddress,
    srcPort,
    dstIpAddress,
    dstPort,
    ruleOrder,
  ) => {
    let cmd = `iptables ${ruleOrder || "-A"} ${chain} -p ${protocol}`;

    // Source IP Address
    if (srcIpAddress) {
      cmd += ` -s ${srcIpAddress}`;
    }

    // Source Port
    if (srcPort) {
      cmd += ` --sport ${srcPort}`;
    }

    // Destination IP Address
    if (dstIpAddress) {
      cmd += ` -d ${dstIpAddress}`;
    }

    // Destination Port
    if (dstPort) {
      cmd += ` --dport ${dstPort}`;
    }

    cmd += ` -j ${action}`;
    return cmd;
  };

  useEffect(() => {
    const newRule = generateRule(
      chain,
      protocol,
      action,
      srcIpAddress,
      srcPort,
      dstIpAddress,
      dstPort,
      ruleOrder,
    );
    setGeneratedRule(newRule);
  }, [
    chain,
    protocol,
    action,
    srcIpAddress,
    srcPort,
    dstIpAddress,
    dstPort,
    ruleOrder,
  ]); // Dependencies

  // Function to copy the generated rule to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedRule)
      .then(() => {
        alert("Rule copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="firewallRuleGenerator">
      {/* Input fields for protocol, IP, etc. */}
      <div>
        <select
          name="chain"
          id="chain"
          required
          onChange={(e) => setChain(e.target.value)}
        >
          <option value="CHAIN">CHAIN</option>
          <option value="INPUT">INPUT</option>
          <option value="FORWARD">FORWARD</option>
          <option value="OUTPUT">OUTPUT</option>
        </select>

        <select
          name="protocol"
          id="protocol"
          required
          onChange={(e) => setProtocol(e.target.value)}
        >
          <option value="PROTOCOL">PROTOCOL</option>
          <option value="TCP">TCP</option>
          <option value="UDP">UDP</option>
          <option value="IP">IP</option>
          <option value="ICMP">ICMP</option>
        </select>

        <select
          name="action"
          id="action"
          required
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="ACTION">ACTION</option>
          <option value="ACCEPT">ACCEPT</option>
          <option value="DROP">DROP</option>
          <option value="QUEUE">QUEUE</option>
        </select>

        <input
          type="text"
          id="srcIpAddress"
          name="srcIpAddress"
          placeholder="SOURCE ADDRESS"
          required
          onChange={(e) => setSrcIpAddress(e.target.value)}
        />

        <input
          type="number"
          id="srcPort"
          name="srcPort"
          placeholder="SOURCE PORT"
          required
          onChange={(e) => setSrcPort(e.target.value)}
        />

        <input
          type="text"
          id="dstIpAddres"
          name="dstIpAddres"
          placeholder="DESTINATION ADDRESS"
          required
          onChange={(e) => setDstIpAddress(e.target.value)}
        />

        <input
          type="number"
          id="dstPort"
          name="dstPort"
          placeholder="DESTINATION PORT"
          required
          onChange={(e) => setDstPort(e.target.value)}
        />

        <input
          type="number"
          id="ruleOrder"
          name="ruleOrder"
          placeholder="RULE ORDER"
          required
          onChange={(e) => setRuleOrder(e.target.value)}
        />
      </div>
      <div className="ruleBox">
        <p id="generatedRule">{generatedRule}</p>
        <input
          type="image"
          width={20}
          height={20}
          src="https://utfs.io/f/0c19640b-5178-480e-8268-9d890f933ebf-21khcv.png"
          onClick={copyToClipboard}
        ></input>
      </div>
    </div>
  );
}

export default FirewallRuleGenerator;
