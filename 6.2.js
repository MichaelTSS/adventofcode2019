/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-6.1.txt', 'utf-8')

class NodesList {
  constructor () {
    this.list = []
    this.tree = null
  }

  findNodeInTree (value) {
    if (this.tree == null) return null
    //
    const nodesInTree = [this.tree]
    let currentNode
    while (nodesInTree.length > 0) {
      currentNode = nodesInTree.pop()
      if (currentNode.value === value) return currentNode
      nodesInTree.push(...currentNode.children)
    }
    return null
  }

  add (nodePair) {
    this.list.push(nodePair)
  }

  buildTree () {
    while (this.list.length > 0) {
      this.list = this.list.reduce((acc, nodePair) => {
        const [x, y] = nodePair.split(')')
        const nodeX = this.findNodeInTree(x)
        const nodeY = this.findNodeInTree(y)
        if (nodeX != null) {
          // add Y as child
          nodeX.children.push(new Node(y, nodeX))
        } else if (nodeY != null) {
          // add X as parent
          const nodeX = new Node(x, null)
          nodeX.children.push(nodeY)
          nodeY.parent = nodeX
          this.tree = nodeX
        } else if (this.tree == null) {
          // create first pair of nodes
          const nodeX = new Node(x, null)
          nodeX.children.push(new Node(y, nodeX))
          this.tree = nodeX
        } else {
          // pass
          acc.push(nodePair)
          return acc
        }
        //
        const idx = acc.indexOf(nodePair)
        if (idx > -1) {
          acc.splice(idx, 1)
        }
        return acc
      }, [])
      // console.log(`Went throught the list, counting ${this.list.length} elements`)
    }
  }

  findPath (x, y) {
    const valuesXList = nodesList.findNodeInTree(x).getNodesUp()
    const valuesYList = nodesList.findNodeInTree(y).getNodesUp()
    for (let i = 0; i < valuesXList.length; i++) {
      const value = valuesXList[i]
      const j = valuesYList.indexOf(value)
      if (j > -1) return i + j
    }
  }
}

class Node {
  constructor (value, parent) {
    this.value = value
    this.parent = parent
    this.children = []
  }

  toString () {
    return `{${this.value}}`
  }

  getNodesUp () {
    let currentNode = this.parent
    const nodesUp = [currentNode.value]
    while (currentNode.parent != null) {
      currentNode = currentNode.parent
      nodesUp.push(currentNode.value)
    }
    return nodesUp
  }

  getRoot () {
    let currentNode = this
    while (currentNode.parent != null) {
      currentNode = currentNode.parent
    }
    return currentNode
  }
}

const nodesList = new NodesList()

inputRaw.trim().split('\n').forEach(line => {
  const nodePair = line.trim()
  // console.log(data)
  nodesList.add(nodePair)
})

nodesList.buildTree()
console.log(nodesList.findPath('YOU', 'SAN'))
