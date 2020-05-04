import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
const ShoppingList = (props) => {
  useEffect(() => {
    props.getItems();
    console.log("1111111111111111111");
  }, []);

  return (
    <Container>
      <Button
        color="dark"
        style={{ margin: "2rem" }}
        onClick={() => {
          let name = prompt("Enter Name");
          if (name) {
            props.addItem(name);
          }
        }}
      >
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.item.items.map(({ _id, name }) => {
            return (
              <CSSTransition key={_id} timeout={500} class="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    style={{ marginRight: "2rem" }}
                    onClick={() => {
                      props.deleteItem(_id);
                    }}
                  >
                    X
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = function (state) {
  return { item: state.item };
};

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
  ShoppingList
);
