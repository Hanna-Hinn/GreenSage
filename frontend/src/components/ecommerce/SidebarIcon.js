import { connect } from "react-redux";
import { openCart } from "../../redux/action/cart";
import { openWishlistModal } from "../../redux/action/wishlistAction";

const SideBarIcons = ({
  openCart,
  totalCartItems,
  totalWishlistItems,
  openWishlistModal,
}) => {
  return (
    <>
      <div className="right-sidebar-popup-btn">
        <div className="popup-btn cart" onClick={openCart}>
          Cart
          <span> {totalCartItems}</span>
        </div>
        <div className="popup-btn wishlist" onClick={openWishlistModal}>
          Wishlist
          <span> {totalWishlistItems}</span>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  totalCartItems: state.cart.length,
  totalWishlistItems: state.wishlist.items.length,
});

const mapDispatchToProps = {
  openWishlistModal,
  openCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarIcons);
