---
title: PyTorch
status: new
---

本文记录 [PyTorch](https://pytorch.org/docs/stable/index.html) 的基本用法。

## 环境配置与系统信息

### 查看系统信息

```bash
python -m torch.utils.collect_env
```

### 指定可见 GPU

让系统只关注特定的显卡：

```bash
CUDA_VISIBLE_DEVICES=0,1 python main.py
```

假设一机八卡，此时 torch 只会找到其中编号为 0 和 1 的卡。

### 分布式训练环境变量

分布式推理中`int(os.getenv("WORLD_SIZE"))` 等于 `torchrun` 中所有参与进程的总数，比如两台机器，每台机器 8 张卡，那么运行

```bash
torchrun \
  --nnodes=2 \
  --nproc_per_node=8 \
  --node_rank=0 \
  --master_addr=10.0.0.1 \
  --master_port=23456 \
  train.py
```

后`os.getenv("WORLD_SIZE")` 就是 16。

使用 torchrun 后，需要给每一个进程分配线程数，否则可能会警告并默认给每一个进程分配 1 个线程：

```text
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] *****************************************
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] Setting OMP_NUM_THREADS environment variable for each process to be 1 in default, to avoid your system being overloaded, please further tune the variable for optimal performance in your application as needed. 
W1114 17:59:52.294000 3097815 torch/distributed/run.py:774] *****************************************
```

显式指定即可：

```bash
OMP_NUM_THREADS=8 torchrun xxx.py
```

## 张量基础

### 创建张量

```python
import torch

# 从 Python 列表创建
x = torch.tensor([1, 2, 3])
print(x)  # tensor([1, 2, 3])

# 创建特殊张量
zeros = torch.zeros(2, 3)  # 全零张量
ones = torch.ones(2, 3)    # 全一张量
rand = torch.rand(2, 3)    # [0, 1) 均匀分布
randn = torch.randn(2, 3)  # 标准正态分布

# 创建指定数据类型的张量
x_float = torch.tensor([1, 2, 3], dtype=torch.float32)
x_long = torch.tensor([1, 2, 3], dtype=torch.long)

# 从 NumPy 数组创建
import numpy as np
np_array = np.array([1, 2, 3])
x_from_np = torch.from_numpy(np_array)

# 创建与现有张量相同形状的张量
x = torch.randn(2, 3)
y = torch.zeros_like(x)  # 形状与 x 相同的全零张量
```

### 张量属性

```python
x = torch.randn(2, 3, 4)

print(x.shape)        # torch.Size([2, 3, 4])
print(x.size())       # torch.Size([2, 3, 4])
print(x.dtype)        # torch.float32
print(x.device)       # cpu 或 cuda:0
print(x.numel())      # 24 (元素总数)
print(x.dim())        # 3 (维度数)
```

### 张量操作

```python
# 基本运算
x = torch.tensor([1, 2, 3])
y = torch.tensor([4, 5, 6])

z = x + y           # 加法
z = torch.add(x, y) # 加法（函数形式）
x.add_(y)           # 原地加法（会修改 x）

z = x * y           # 逐元素乘法
z = x @ y           # 点积（1D）
z = x.dot(y)        # 点积

# 矩阵运算
A = torch.randn(2, 3)
B = torch.randn(3, 4)
C = A @ B           # 矩阵乘法
C = torch.matmul(A, B)  # 矩阵乘法（函数形式）

# 形状变换
x = torch.randn(2, 3, 4)
y = x.view(2, 12)       # 重塑为 (2, 12)
y = x.reshape(2, -1)    # -1 自动推断维度
y = x.transpose(0, 1)   # 转置维度 0 和 1
y = x.permute(2, 0, 1)  # 重排维度

# 索引和切片
x = torch.randn(4, 5)
print(x[0])        # 第一行
print(x[:, 1])     # 第二列
print(x[1:3, :])   # 第 2-3 行

# 拼接
x = torch.randn(2, 3)
y = torch.randn(2, 3)
z = torch.cat([x, y], dim=0)  # 沿维度 0 拼接，结果 (4, 3)
z = torch.stack([x, y], dim=0)  # 创建新维度，结果 (2, 2, 3)
```

### GPU 加速

```python
# 检查 CUDA 是否可用
print(torch.cuda.is_available())

# 设置默认设备
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 将张量移动到 GPU
x = torch.randn(2, 3)
x_gpu = x.to(device)
x_gpu = x.cuda()  # 简写形式

# 在 GPU 上直接创建张量
x_gpu = torch.randn(2, 3, device=device)

# 将张量移回 CPU
x_cpu = x_gpu.cpu()
```

## 三、自动微分

### 3.1 基本用法

```python
# 创建需要梯度的张量
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x + 1

# 计算梯度
y.backward()
print(x.grad)  # tensor([7.]) (dy/dx = 2x + 3 = 7)

# 梯度累积（默认行为）
x = torch.tensor([2.0], requires_grad=True)
for i in range(3):
    y = x ** 2
    y.backward()
    print(x.grad)  # 梯度会累积

# 清零梯度
x.grad.zero_()
```

### 3.2 复杂计算图

```python
x = torch.randn(3, requires_grad=True)
y = x * 2

while y.data.norm() < 1000:
    y = y * 2

print(y)

# 对非标量进行反向传播需要提供 gradient 参数
v = torch.tensor([0.1, 1.0, 0.0001], dtype=torch.float)
y.backward(v)

print(x.grad)
```

### 3.3 控制梯度计算

```python
# 临时禁用梯度计算
x = torch.randn(3, requires_grad=True)

with torch.no_grad():
    y = x * 2  # y 不会追踪梯度

# 使用 @torch.no_grad() 装饰器
@torch.no_grad()
def inference(model, x):
    return model(x)

# 分离张量（创建不需要梯度的副本）
x = torch.randn(3, requires_grad=True)
y = x.detach()  # y 与 x 共享数据但不追踪梯度
```

## 四、神经网络基础

### 4.1 使用 nn.Module 构建网络

```python
import torch.nn as nn
import torch.nn.functional as F

class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)
        
    def forward(self, x):
        x = x.view(-1, 784)  # 展平
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = SimpleNet()
print(model)

# 查看参数
for name, param in model.named_parameters():
    print(f"{name}: {param.shape}")
```

### 4.2 常用层

```python
# 全连接层
fc = nn.Linear(in_features=100, out_features=10)

# 卷积层
conv2d = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1)
conv1d = nn.Conv1d(in_channels=10, out_channels=20, kernel_size=5)

# 池化层
maxpool = nn.MaxPool2d(kernel_size=2, stride=2)
avgpool = nn.AdaptiveAvgPool2d((1, 1))  # 自适应池化

# 归一化层
bn = nn.BatchNorm2d(64)
ln = nn.LayerNorm(128)

# Dropout
dropout = nn.Dropout(p=0.5)

# 激活函数
relu = nn.ReLU()
sigmoid = nn.Sigmoid()
tanh = nn.Tanh()
```

### 4.3 卷积神经网络示例

```python
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.5)
        
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # (28, 28) -> (14, 14)
        x = self.pool(F.relu(self.conv2(x)))  # (14, 14) -> (7, 7)
        x = x.view(-1, 64 * 7 * 7)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

model = CNN()
```

### 4.4 Sequential 容器

```python
# 使用 Sequential 简化模型定义
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(128, 10)
)

# 使用 OrderedDict 命名层
from collections import OrderedDict
model = nn.Sequential(OrderedDict([
    ('fc1', nn.Linear(784, 256)),
    ('relu1', nn.ReLU()),
    ('fc2', nn.Linear(256, 10))
]))
```

## 五、训练流程

### 5.1 完整训练示例

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset

# 1. 准备数据
X_train = torch.randn(1000, 10)
y_train = torch.randint(0, 2, (1000,))
train_dataset = TensorDataset(X_train, y_train)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# 2. 定义模型
model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.Linear(32, 2)
)

# 3. 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 4. 训练循环
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

num_epochs = 10
for epoch in range(num_epochs):
    model.train()  # 设置为训练模式
    running_loss = 0.0
    
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        
        # 前向传播
        outputs = model(data)
        loss = criterion(outputs, target)
        
        # 反向传播
        optimizer.zero_grad()  # 清零梯度
        loss.backward()        # 计算梯度
        optimizer.step()       # 更新参数
        
        running_loss += loss.item()
    
    avg_loss = running_loss / len(train_loader)
    print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}")
```

### 5.2 验证和测试

```python
def evaluate(model, data_loader, criterion, device):
    model.eval()  # 设置为评估模式
    total_loss = 0.0
    correct = 0
    total = 0
    
    with torch.no_grad():  # 禁用梯度计算
        for data, target in data_loader:
            data, target = data.to(device), target.to(device)
            outputs = model(data)
            loss = criterion(outputs, target)
            
            total_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += target.size(0)
            correct += (predicted == target).sum().item()
    
    avg_loss = total_loss / len(data_loader)
    accuracy = 100 * correct / total
    return avg_loss, accuracy

# 使用
val_loss, val_acc = evaluate(model, val_loader, criterion, device)
print(f"Validation Loss: {val_loss:.4f}, Accuracy: {val_acc:.2f}%")
```

### 5.3 学习率调度

```python
# 阶梯式学习率衰减
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)

# 余弦退火
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=10)

# 根据验证指标调整
scheduler = optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', factor=0.5, patience=3
)

# 训练循环中使用
for epoch in range(num_epochs):
    train_one_epoch()
    val_loss = validate()
    
    # StepLR 或 CosineAnnealingLR
    scheduler.step()
    
    # ReduceLROnPlateau
    scheduler.step(val_loss)
```

## 六、数据处理

### 6.1 Dataset 和 DataLoader

```python
from torch.utils.data import Dataset, DataLoader

class CustomDataset(Dataset):
    def __init__(self, data, labels, transform=None):
        self.data = data
        self.labels = labels
        self.transform = transform
    
    def __len__(self):
        return len(self.data)
    
    def __getitem__(self, idx):
        sample = self.data[idx]
        label = self.labels[idx]
        
        if self.transform:
            sample = self.transform(sample)
        
        return sample, label

# 使用
dataset = CustomDataset(X_train, y_train)
dataloader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,  # 多进程加载
    pin_memory=True  # 加速 CPU 到 GPU 传输
)
```

### 6.2 图像数据增强

```python
from torchvision import transforms

# 定义变换
transform = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                        std=[0.229, 0.224, 0.225])
])

# 应用到数据集
from torchvision.datasets import ImageFolder

train_dataset = ImageFolder(root='train/', transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
```

### 6.3 内置数据集

```python
from torchvision import datasets, transforms

# MNIST
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

train_dataset = datasets.MNIST(
    root='./data',
    train=True,
    download=True,
    transform=transform
)

# CIFAR-10
train_dataset = datasets.CIFAR10(
    root='./data',
    train=True,
    download=True,
    transform=transform
)
```

## 七、模型保存与加载

### 7.1 保存和加载整个模型

```python
# 保存
torch.save(model, 'model.pth')

# 加载
model = torch.load('model.pth')
model.eval()
```

### 7.2 保存和加载模型参数（推荐）

```python
# 保存
torch.save(model.state_dict(), 'model_params.pth')

# 加载
model = SimpleNet()  # 需要先实例化模型
model.load_state_dict(torch.load('model_params.pth'))
model.eval()
```

### 7.3 保存训练检查点

```python
# 保存
checkpoint = {
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}
torch.save(checkpoint, 'checkpoint.pth')

# 加载并继续训练
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
start_epoch = checkpoint['epoch']
loss = checkpoint['loss']

model.train()
```

## 八、高级技巧

### 8.1 混合精度训练

```python
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for epoch in range(num_epochs):
    for data, target in train_loader:
        data, target = data.to(device), target.to(device)
        
        optimizer.zero_grad()
        
        # 自动混合精度
        with autocast():
            outputs = model(data)
            loss = criterion(outputs, target)
        
        # 梯度缩放
        scaler.scale(loss).backward()
        scaler.step(optimizer)
        scaler.update()
```

### 8.2 梯度裁剪

```python
# 训练循环中
loss.backward()

# 裁剪梯度范数
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

# 或裁剪梯度值
torch.nn.utils.clip_grad_value_(model.parameters(), clip_value=0.5)

optimizer.step()
```

### 8.3 模型融合（Ensemble）

```python
class EnsembleModel(nn.Module):
    def __init__(self, models):
        super(EnsembleModel, self).__init__()
        self.models = nn.ModuleList(models)
    
    def forward(self, x):
        predictions = [model(x) for model in self.models]
        # 平均预测结果
        return torch.stack(predictions).mean(dim=0)

# 使用
model1 = CNN()
model2 = CNN()
model3 = CNN()
ensemble = EnsembleModel([model1, model2, model3])
```

### 8.4 自定义损失函数

```python
class CustomLoss(nn.Module):
    def __init__(self, weight=1.0):
        super(CustomLoss, self).__init__()
        self.weight = weight
    
    def forward(self, predictions, targets):
        mse_loss = F.mse_loss(predictions, targets)
        l1_loss = F.l1_loss(predictions, targets)
        return mse_loss + self.weight * l1_loss

criterion = CustomLoss(weight=0.5)
```

## 九、分布式训练进阶

### 9.1 DataParallel（单机多卡）

```python
# 简单的数据并行
if torch.cuda.device_count() > 1:
    print(f"使用 {torch.cuda.device_count()} 个 GPU")
    model = nn.DataParallel(model)

model.to(device)
```

### 9.2 DistributedDataParallel（推荐）

```python
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

def setup(rank, world_size):
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)

def cleanup():
    dist.destroy_process_group()

def train_ddp(rank, world_size):
    setup(rank, world_size)
    
    model = CNN().to(rank)
    model = DDP(model, device_ids=[rank])
    
    # 使用 DistributedSampler
    from torch.utils.data.distributed import DistributedSampler
    sampler = DistributedSampler(train_dataset, num_replicas=world_size, rank=rank)
    train_loader = DataLoader(train_dataset, batch_size=32, sampler=sampler)
    
    # 训练循环
    for epoch in range(num_epochs):
        sampler.set_epoch(epoch)  # 打乱数据
        for data, target in train_loader:
            # 训练代码
            pass
    
    cleanup()

# 使用 torchrun 启动
# torchrun --nproc_per_node=4 train.py
```

### 9.3 梯度累积

```python
accumulation_steps = 4

for i, (data, target) in enumerate(train_loader):
    outputs = model(data)
    loss = criterion(outputs, target)
    loss = loss / accumulation_steps  # 归一化损失
    loss.backward()
    
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

## 十、调试与性能优化

### 10.1 检测异常值

```python
# 启用异常检测
torch.autograd.set_detect_anomaly(True)

# 检查 NaN 和 Inf
def check_nan_inf(tensor, name="tensor"):
    if torch.isnan(tensor).any():
        print(f"{name} contains NaN")
    if torch.isinf(tensor).any():
        print(f"{name} contains Inf")
```

### 10.2 性能分析

```python
from torch.profiler import profile, ProfilerActivity

with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA]) as prof:
    for i in range(10):
        output = model(input_data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

print(prof.key_averages().table(sort_by="cuda_time_total", row_limit=10))
```

### 10.3 内存优化

```python
# 使用 checkpoint 减少内存占用（牺牲速度）
from torch.utils.checkpoint import checkpoint

class MyModel(nn.Module):
    def forward(self, x):
        # 使用 checkpoint 包装计算密集的部分
        x = checkpoint(self.heavy_computation, x)
        return x

# 及时释放不需要的张量
del large_tensor
torch.cuda.empty_cache()
```

## 十一、实用工具

### 11.1 TensorBoard 可视化

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter('runs/experiment_1')

for epoch in range(num_epochs):
    # 训练
    train_loss = train_one_epoch()
    val_loss, val_acc = validate()
    
    # 记录标量
    writer.add_scalar('Loss/train', train_loss, epoch)
    writer.add_scalar('Loss/val', val_loss, epoch)
    writer.add_scalar('Accuracy/val', val_acc, epoch)
    
    # 记录模型图
    if epoch == 0:
        writer.add_graph(model, input_data)
    
    # 记录图像
    writer.add_images('predictions', img_grid, epoch)

writer.close()

# 启动 TensorBoard: tensorboard --logdir=runs
```

### 11.2 随机种子设置

```python
def set_seed(seed=42):
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    np.random.seed(seed)
    import random
    random.seed(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False

set_seed(42)
```

### 11.3 模型参数统计

```python
def count_parameters(model):
    return sum(p.numel() for p in model.parameters() if p.requires_grad)

print(f"模型参数量: {count_parameters(model):,}")

# 查看每层参数
for name, param in model.named_parameters():
    print(f"{name}: {param.numel():,} 参数")
```

## 十二、常见问题与解决方案

### 12.1 内存不足（OOM）

```python
# 减小 batch size
batch_size = 16  # 从 32 减少到 16

# 使用梯度累积模拟大 batch
accumulation_steps = 4

# 使用混合精度训练
from torch.cuda.amp import autocast, GradScaler

# 释放缓存
torch.cuda.empty_cache()
```

### 12.2 训练不收敛

```python
# 检查学习率
optimizer = optim.Adam(model.parameters(), lr=1e-4)  # 降低学习率

# 添加梯度裁剪
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

# 检查损失函数
print(f"Loss: {loss.item()}")  # 监控损失值

# 使用学习率预热
def warmup_lr_scheduler(optimizer, warmup_iters, warmup_factor):
    def f(x):
        if x >= warmup_iters:
            return 1
        alpha = float(x) / warmup_iters
        return warmup_factor * (1 - alpha) + alpha
    return torch.optim.lr_scheduler.LambdaLR(optimizer, f)
```

### 12.3 过拟合

```python
# 添加 Dropout
model.add_module('dropout', nn.Dropout(0.5))

# 使用数据增强
transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ToTensor()
])

# 添加权重衰减（L2 正则化）
optimizer = optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)

# 早停
class EarlyStopping:
    def __init__(self, patience=7, delta=0):
        self.patience = patience
        self.counter = 0
        self.best_loss = None
        self.delta = delta
    
    def __call__(self, val_loss):
        if self.best_loss is None:
            self.best_loss = val_loss
        elif val_loss > self.best_loss - self.delta:
            self.counter += 1
            if self.counter >= self.patience:
                return True
        else:
            self.best_loss = val_loss
            self.counter = 0
        return False
```

## 参考资源

- [PyTorch 官方文档](https://pytorch.org/docs/stable/index.html)
- [PyTorch 教程](https://docs.pytorch.org/tutorials/)
- [PyTorch 论坛](https://discuss.pytorch.org/)
- [PyTorch GitHub](https://github.com/pytorch/pytorch)
