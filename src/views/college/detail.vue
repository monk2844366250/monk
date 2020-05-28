<template>
  <div class="college-contain">
    <div class="detail">
      <div class="back" @click="goToCollege">
        <svg-icon icon-class="back" style="color: rgb(102,102,255);" />
      </div>
      <div class="title">{{ detail.title }}</div>
      <div class="time mr30">发布时间：{{ detail.releaseTime }}</div>
      <div class="content" v-html="detail.content"></div>
    </div>

    <div class="like">
        <!-- <el-button type="text" @click="backTop" v-re-click>
        <div class="like-icon">
          <svg-icon icon-class="backTop" style=" font-size: 35px;" />
        </div> -->
        <el-backtop ></el-backtop>
      <!-- </el-button> -->
      <el-button type="text" @click="handleAddYwArticlePraise" v-re-click>
        <div class="like-icon">
          <svg-icon icon-class="dianzan" style=" font-size: 35px;" />
          <div class="like-icon-num">{{ detail.praiseNum }}</div>
        </div>
      </el-button>

      <!-- <div class="like-icon" style="margin-left: 25px">
                <svg-icon icon-class="dianzan1" style="padding-top: 5px; font-size: 35px;"/>
                <div class="like-icon-num"> {{ detail.praiseNum }} </div>
      </div>-->
    </div>

    <div class="comment">
      <div class="comment-head">
        <span style="color:rgb(102,102,255);padding-right: 15px">{{ comment.total }}</span>评论
      </div>
      <div class="comment-input">
        <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入评论内容" v-model="content"></el-input>
        <el-button
          v-re-click
          type="primary"
          style="margin-top: 15px"
          size="small"
          class="btn-theme"
          @click="handleAddYwArticleComment"
        >评论</el-button>
      </div>

      <div class="comment-list" v-loading="listLoading">
        <div v-for="item in commentList">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-avatar :size="50" :src="item.avatar" style="margin-left: 20px"></el-avatar>
            </el-col>
            <el-col :span="20">
              <div>
                <div class="comment-list-title">{{ item.nickname }}</div>
                <div class="comment-list-content">{{ item.content }}</div>
                <div class="comment-list-time">{{ item.createTime }}</div>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button
                v-re-click
                type="primary"
                size="mini"
                class="btn-theme"
                @click="handleAddYwArticleCommentPraise(item.id)"
              >
                <svg-icon icon-class="dianzan" style="font-size: 20px" />
                <span style="padding-left: 15px;">+{{ item.praiseNum }}</span>
              </el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-pagination
          :hide-on-single-page="true"
          @size-change="initComment"
          @current-change="initComment"
          :current-page.sync="comment.pageNum"
          :page-size="comment.pageSize"
          layout="prev, pager, next, jumper"
          :total="comment.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectArticleById,
  addYwArticlePraise,
  selectYwArticleCommentList,
  addYwArticleComment,
  addYwArticleCommentPraise
} from "@/api/collega";
export default {
  name: "recordDetail",
  data() {
    return {
      content: "",
      detail: {},
      curId: null,
      listLoading: false,
      comment: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      commentList: []
    };
  },
  created() {
    if (this.$route.query.collegaId){
      this.curId = this.$route.query.collegaId;
      this.init();
      this.initComment();
    }else{
      this.$router.push({ path: "/admin/college" });
    }

  },
  methods: {
    init() {
      const data = {
        aid: this.curId
      };
      selectArticleById(data).then(response => {
        if (response.code === 0) {
          console.log(response);
          this.detail = response.data;
        } else {
          this.$message({
            message: response.msg,
            type: "warning"
          });
        }
      });
    },
    initComment() {
      const data = {
        aid: this.curId,
        pageNum: this.comment.pageNum,
        pageSize: this.comment.pageSize
      };
      this.listLoading = true;
      selectYwArticleCommentList(data).then(response => {
        if (response.code === 0) {
          var { data } = response;
          this.comment.total = data.total;
          this.commentList = data.rows;
          this.listLoading = false;
        } else {
          this.$message({
            message: response.msg,
            type: "warning"
          });
          this.listLoading = false;
        }
      });
    },
    handleAddYwArticlePraise() {
      const data = {
        aid: this.curId
      };
      addYwArticlePraise(data).then(response => {
        if (response.code === 0) {
          this.$message({
            message: "点赞成功",
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: response.msg,
            type: "warning"
          });
        }
      });
    },
    handleAddYwArticleComment() {
      if (this.content.length === 0) {
        this.$message({
          message: "请输入评论内容",
          type: "warning"
        });
        return;
      }

      const data = {
        aid: this.curId,
        content: this.content
      };
      addYwArticleComment(data).then(response => {
        if (response.code === 0) {
          this.$message({
            message: "评论成功",
            type: "success"
          });
          this.content = null;
          this.initComment();
        } else {
          this.$message({
            message: response.msg,
            type: "warning",
            showClose: true,
            duration: 2000
          });
        }
      });
    },
    handleAddYwArticleCommentPraise(id) {
      const data = {
        cid: id
      };
      addYwArticleCommentPraise(data).then(response => {
        if (response.code === 0) {
          this.$message({
            message: "点赞评论成功",
            type: "success"
          });
          this.initComment();
        } else {
          this.$message({
            message: response.msg,
            type: "warning",
            showClose: true,
            duration: 2000
          });
        }
      });
    },
    goToCollege() {
      this.$router.push({ path: "/admin/college" });
    },
  }
};
</script>

<style scoped>
.college-contain {
  margin: 0 40px;
}
.detail {
  border: 1px solid rgb(102, 102, 255);
}
.back {
  font-size: 40px;
  cursor: pointer;
}
.mr30 {
  margin: 0 40px;
}
.title {
  padding: 30px;
  text-align: center;
  font-size: 24px;
}
.time {
  text-align: right;
  padding-right: 40px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgb(102, 102, 255);
}
.content {
  min-height: 300px;
  margin: 40px 40px 40px 40px;
  font-size: 16px;
  line-height: 24px;
}
.content p {
  margin-bottom: 12px;
}
.like {
  margin-top: 10px;
  position: relative;
}
.like-icon {
  color: rgb(102, 102, 255);
  border: 1px solid rgb(102, 102, 255);
  border-radius: 50%;
  padding: 5px;
  width: 50px;
  height: 50px;
  line-height: 25px;
  display: inline-table;
  position: relative;
}
.like-icon-num {
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  top: 49px;
}
.comment {
  margin-top: 50px;
}
.comment-head {
  font-size: 20px;
  margin-bottom: 10px;
}
.comment-input {
  text-align: right;
  margin-bottom: 70px;
}
.comment >>> .el-textarea__inner {
  border-color: rgb(102, 102, 255);
}
.comment-list-title {
  color: #6b6b6b;
  font-size: 12px;
}
.comment-list-content {
  font-size: 15px;
  padding: 15px 0;
  word-wrap: break-word;
  word-break: break-all;
}
.comment-list-time {
  color: #6b6b6b;
  font-size: 12px;
}
</style>
