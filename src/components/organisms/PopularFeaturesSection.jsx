import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const PopularFeaturesSection = ({ navigate: navProp, UserData = {} }) => {
  const routerNavigate = useNavigate();
  const navigate = navProp || routerNavigate;
  const userId = UserData?._id || "";

  return (
    <div>
      <h2
        style={{ color: colors.darkPurple }}
        className="mb-4 text-lg font-semibold"
      >
        Popular Features
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Lucky Draw */}
        <div
          onClick={() => navigate("/luckydraw", { state: userId })}
          className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: colors.lightBgCard,
            border: `1px solid ${colors.lightPurpleOverlay50}`,
            boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
          }}
        >
          <h4
            style={{ color: colors.darkPurple }}
            className="mb-2 font-semibold"
          >
            🍡 Lucky Draw
          </h4>
          <p style={{ color: colors.mediumPurple }} className="text-sm">
            Win amazing prizes daily
          </p>
        </div>

        {/* Help & Support */}
        <div
          onClick={() => navigate("/support")}
          className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: colors.lightBgCard,
            border: `1px solid ${colors.lightPurpleOverlay50}`,
            boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
          }}
        >
          <h4
            style={{ color: colors.darkPurple }}
            className="mb-2 font-semibold"
          >
            💬 Support
          </h4>
          <p style={{ color: colors.mediumPurple }} className="text-sm">
            Get help anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularFeaturesSection;
