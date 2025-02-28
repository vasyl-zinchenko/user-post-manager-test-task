<template>
  <el-card>
    <template #header>
      <el-button type="primary" @click="resetForm" plain class="create-button">
        Create Post
      </el-button>

      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" :aria-hidden="!activeNames.includes('1')">
          <el-form
            :model="form"
            label-width="auto"
            label-position="top"
            :rules="rules"
            ref="ruleFormRef"
          >
            <el-form-item label="Title" prop="title">
              <el-input v-model="form.title" placeholder="Enter post title" />
            </el-form-item>

            <el-form-item label="Body" prop="body">
              <el-input
                v-model="form.body"
                type="textarea"
                placeholder="Enter post body"
                :rows="4"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="addPost(ruleFormRef)"
                >Create</el-button
              >
              <el-button @click="resetForm">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <div class="card-header">
        <span>Author: {{ user.name }} </span>
      </div>
    </template>

    <div>
      <el-skeleton v-if="isLoading" :rows="10" animated />

      <div class="post-wrapper" v-else>
        <div v-for="post in posts" :key="post.id" class="post">
          <p class="post_title">{{ post.title }}</p>
          <p class="post_body">{{ post.body }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store/modalStore';
import { onMounted, ref, computed, reactive } from 'vue';
import { showNotification } from '@/helpers/notifications';
import { postApi } from '@/api/posts';
import type { FormInstance, FormRules } from 'element-plus';
import type { Post } from '@/types/models';

interface RuleForm {
  title: string;
  body: string;
}

const { getPostsByUserId, createPost } = postApi();
const modalStore = useModalStore();

const posts = ref<Post[]>([]);
const isLoading = ref(true);
const ruleFormRef = ref<FormInstance>();
const activeNames = ref<string[]>([]);

const user = computed(() => modalStore.props.user);

const form = ref<RuleForm>({
  title: '',
  body: '',
});

const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: 'Please input title', trigger: 'blur' },
    { min: 3, message: 'Length should be more than 3 ', trigger: 'blur' },
  ],
  body: [
    { required: true, message: 'Please input body', trigger: 'blur' },
    { min: 5, message: 'Length should be more than 5', trigger: 'blur' },
  ],
});

const toggleCollapse = () => {
  if (activeNames.value.includes('1')) {
    activeNames.value = [];
  } else {
    activeNames.value = ['1'];
  }
};

const resetForm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields();
  }
  toggleCollapse();
};

const loadUserPosts = async () => {
  const { data, error, loading } = await getPostsByUserId(user.value.id);
  isLoading.value = loading;
  if (error) {
    showNotification('error', 'Posts cannot be loaded');
    return;
  }
  if (data) {
    posts.value = data;
  }
};

const addPost = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      const { data, error } = await createPost(user.value.id, {
        title: form.value.title,
        body: form.value.body,
        userId: user.value.id,
      });

      if (error) {
        showNotification('error', 'Post cannot be added');
        return;
      }

      posts.value.push(data as Post);
      resetForm();
      showNotification('success', 'Post was successfully added');
    } else {
      console.log('Validation failed');
    }
  });
};

onMounted(() => {
  loadUserPosts();
});
</script>

<style scoped>
.el-card {
  border: none;
  box-shadow: none;
}

input {
  font-size: 10px;
}

:deep(.el-card__body) {
  max-height: 100%;
  overflow-y: auto;
  height: 100%;
}

.card-header {
  font-size: 14px;
  font-weight: 600;
}

.post-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  padding: 5px;

  .post_title {
    font-weight: 600;
  }
  .post_body {
    margin-top: 5px;
  }
}

.el-collapse {
  border: none;
}

.create-button {
  display: flex;
  justify-self: end;
  margin-bottom: 10px;
  font-size: 12px;
}

:deep(.el-collapse-item__header) {
  display: none;
}

:deep(.el-collapse-item__wrap) {
  border: none;
}

.post {
  font-size: 12px;
}

@media (min-width: 768px) {
  .post {
    font-size: 14px;
  }

  .card-header {
    font-size: 16px;
  }

  .create-button {
    font-size: 14px;
  }
}
</style>
